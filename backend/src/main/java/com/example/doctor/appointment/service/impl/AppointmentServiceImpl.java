package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.*;
import com.example.doctor.appointment.entity.*;
import com.example.doctor.appointment.enums.AppointmentStatus;
import com.example.doctor.appointment.exception.AppointmentNotFound;
import com.example.doctor.appointment.repository.*;
import com.example.doctor.appointment.service.AppointmentService;
import com.example.doctor.appointment.util.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseDTO<AppointmentDTO> createAppointment(AppointmentDTO request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Patient patient = patientRepository.findByUserId(userDetails.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Schedule schedule = scheduleRepository.findById(request.getScheduleId())
                .orElseThrow(() -> new RuntimeException("No found schedule"));

        TimeSlot slot = timeSlotRepository.findById(request.getTimeSlotId())
                .orElseThrow(() -> new RuntimeException("Time slot not found"));

        if (!slot.isAvailable()) {
            throw new RuntimeException("This time is already taken!");
        }

        boolean existsAppointment = appointmentRepository
                .existsByPatientIdAndStatusIn(patient.getId()
                ,List.of(AppointmentStatus.PENDING,AppointmentStatus.SCHEDULED));

        if (existsAppointment) {
            throw new RuntimeException("You have already appointment, if you have new one. Please cancel previous appointment");
        }


        slot.setAvailable(false);
        timeSlotRepository.save(slot);

        Appointment app = Appointment.builder()
                .doctor(schedule.getDoctor())
                .schedule(schedule)
                .appointmentDate(schedule.getDate())
                .appointmentTime(slot.getTime())
                .status(AppointmentStatus.PENDING)
                .notes(request.getNotes())
                .patient(patient)
                .createdAt(LocalDateTime.now())
                .build();

        Appointment savedAppointment = appointmentRepository.save(app);
        AppointmentDTO dto = modelMapper.map(savedAppointment, AppointmentDTO.class);


        return ResponseDTO.<AppointmentDTO>builder()
                .statusCode(HttpStatus.CREATED.value())
                .data(dto)
                .message("Appointment created successfully")
                .build();
    }

    @Override
    public ResponseDTO<List<AppointmentDTO>> findPatientAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<Appointment> appointments =
                appointmentRepository.findAppointmentsByPatientId(userDetails.getUser().getPatient().getId());

        List<AppointmentDTO> dtos = appointments.stream()
                .map(appointment -> {
                    AppointmentDTO dty = modelMapper.map(appointment,AppointmentDTO.class);
                    dty.setDepartmentName(
                            appointment.getDoctor() != null && appointment.getDoctor().getDepartment() != null ? appointment.getDoctor().getDepartment().getName() : null
                    );
                    dty.setDoctorId(appointment.getDoctor() != null ? appointment.getDoctor().getId() : null);
                    dty.setFullName(appointment.getDoctor().getUser().getFullName());
                    return dty;
                }).toList();

        return ResponseDTO.<List<AppointmentDTO>>builder()
                .data(dtos)
                .statusCode(HttpStatus.OK.value())
                .build();
    }

    @Override
    public ResponseDTO<AppointmentDTO> getAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("No found appointment"));

        return ResponseDTO.<AppointmentDTO>builder()
                .statusCode(200)
                .data(modelMapper.map(appointment,AppointmentDTO.class))
                .build();
    }

    @Override
    public ResponseDTO<String> cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        Schedule schedule = scheduleRepository.findById(appointment.getSchedule().getId())
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        List<TimeSlot> slots = schedule.getTimeSlots();
        for (TimeSlot slot : slots) {
            TimeSlot dbSlot = timeSlotRepository.findById(slot.getId())
                    .orElseThrow(() -> new RuntimeException("Timeslot not found"));
            dbSlot.setAvailable(true);
            timeSlotRepository.save(dbSlot);
        }

        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new RuntimeException("Appointment has been already canceled");
        }
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        return ResponseDTO.<String>builder()
                .message("Appointment updated successfully")
                .build();
    }

    @Override
    public ResponseDTO<Page<DoctorAppointmentDTO>> getAppointmentsByDoctor(
            int pageNumber,int pageSize
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Doctor doctor = doctorRepository.findById(userDetails.getUser().getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id "+
                        userDetails.getUser().getDoctor().getId()));

        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<Appointment> appointments =
                appointmentRepository.findAppointmentsByDoctorId(doctor.getId(),pageable);

        Page<DoctorAppointmentDTO> dtos =
                appointments.map(appointment -> DoctorAppointmentDTO.builder()
                        .id(appointment.getId())
                        .notes(appointment.getNotes())
                        .appointmentDate(appointment.getAppointmentDate())
                        .appointmentTime(appointment.getAppointmentTime())
                        .gender(appointment.getPatient().getGender())
                        .bloodGroup(appointment.getPatient().getBloodGroup())
                        .patientEmail(appointment.getPatient().getUser().getEmail())
                        .phoneNumber(appointment.getPatient().getUser().getPhone())
                        .patientName(appointment.getPatient().getUser().getFullName())
                        .patientNo(appointment.getPatient().getPatientNo())
                        .departmentName(appointment.getDoctor().getDepartment().getName())
                        .status(appointment.getStatus())
                        .build()
                );

        return ResponseDTO.<Page<DoctorAppointmentDTO>>builder()
                .data(dtos)
                .statusCode(HttpStatus.OK.value())
                .message("Fetched all doctor appointments")
                .build();
    }

    @Override
    public ResponseDTO<DoctorAppointmentDTO> getAppointmentDetailByDoctor(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        DoctorAppointmentDTO dto = DoctorAppointmentDTO
                .builder()
                .id(appointment.getId())
                .notes(appointment.getNotes())
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .gender(appointment.getPatient().getGender())
                .bloodGroup(appointment.getPatient().getBloodGroup())
                .patientEmail(appointment.getPatient().getUser().getEmail())
                .phoneNumber(appointment.getPatient().getUser().getPhone())
                .patientName(appointment.getPatient().getUser().getFullName())
                .patientNo(appointment.getPatient().getPatientNo())
                .departmentName(appointment.getDoctor().getDepartment().getName())
                .status(appointment.getStatus())
                .build();

        return ResponseDTO.<DoctorAppointmentDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .data(dto)
                .build();
    }

    @Override
    public ResponseDTO<List<DoctorAppointmentDTO>> getTodayAppointmentsByDoctor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        LocalDate today = LocalDate.now();
        List<Appointment> appointments = appointmentRepository.findTodayAppointmentsForDoctor(
                userDetails.getUser().getDoctor().getId(),
                today
        );

        if (appointments.isEmpty()) {
            throw new AppointmentNotFound("No any appointments in Today");
        }

        System.out.println("AAAA : {}"+appointments);

        List<DoctorAppointmentDTO> dtos = appointments
                .stream()
                .map(appointment -> {
                    DoctorAppointmentDTO dto = DoctorAppointmentDTO
                            .builder()
                            .id(appointment.getId())
                            .notes(appointment.getNotes())
                            .appointmentDate(appointment.getAppointmentDate())
                            .appointmentTime(appointment.getAppointmentTime())
                            .gender(appointment.getPatient().getGender())
                            .bloodGroup(appointment.getPatient().getBloodGroup())
                            .patientEmail(appointment.getPatient().getUser().getEmail())
                            .phoneNumber(appointment.getPatient().getUser().getPhone())
                            .patientName(appointment.getPatient().getUser().getFullName())
                            .patientNo(appointment.getPatient().getPatientNo())
                            .departmentName(appointment.getDoctor().getDepartment().getName())
                            .status(appointment.getStatus())
                            .build();
                    return dto;
                }).toList();

        return ResponseDTO.<List<DoctorAppointmentDTO>>builder()
                .data(dtos)
                .statusCode(HttpStatus.OK.value())
                .build();
    }
}




















