package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.AppointmentDTO;
import com.example.doctor.appointment.dto.DoctorDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.ScheduleDTO;
import com.example.doctor.appointment.entity.*;
import com.example.doctor.appointment.enums.AppointmentStatus;
import com.example.doctor.appointment.repository.*;
import com.example.doctor.appointment.service.AppointmentService;
import com.example.doctor.appointment.util.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

        boolean existsAppointment = timeSlotRepository.existsByTimeAndAvailable(
                slot.getTime(),true
        );

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
                .map(appointment -> modelMapper.map(appointment,AppointmentDTO.class))
                .toList();

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
    public ResponseDTO<List<AppointmentDTO>> getDoctorAppointmentsToday() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Doctor doctor = doctorRepository.findById(userDetails.getUser().getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("No found doctor"));
        DoctorDTO doctorDto = modelMapper.map(doctor, DoctorDTO.class);
        List<AppointmentDTO> appointments =
                doctorDto.getAppointments()
                        .stream()
                        .map(appointmentDTO -> modelMapper.map(appointmentDTO,AppointmentDTO.class))
                        .toList();

        if (appointments.isEmpty()) {
            throw new RuntimeException("No any appointments today");
        }

        return ResponseDTO.<List<AppointmentDTO>>builder()
                .statusCode(200)
                .data(appointments)
                .build();
    }
}




















