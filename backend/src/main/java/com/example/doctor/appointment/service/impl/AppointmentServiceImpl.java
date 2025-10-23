package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.AppointmentDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.Appointment;
import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.entity.Schedule;
import com.example.doctor.appointment.enums.AppointmentStatus;
import com.example.doctor.appointment.repository.AppointmentRepository;
import com.example.doctor.appointment.repository.PatientRepository;
import com.example.doctor.appointment.repository.ScheduleRepository;
import com.example.doctor.appointment.repository.UserRepository;
import com.example.doctor.appointment.service.AppointmentService;
import com.example.doctor.appointment.util.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
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
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseDTO<AppointmentDTO> createAppointment(AppointmentDTO request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Patient patient = patientRepository.findByUserId(userDetails.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        List<Appointment> appointment =
                appointmentRepository.findAppointmentByDoctorIdAndAppointmentDate(
                request.getDoctor().getId()
                        ,request.getAppointmentTime()
        );

        boolean existing =
                appointment
                        .stream()
                        .anyMatch(
                a-> a.getAppointmentTime().equals(request.getAppointmentTime())
        );
        if (existing) {
            throw new RuntimeException("This time is already taken!");
        }
        Schedule schedule = scheduleRepository.findById(request.getSchedule().getId())
                .orElseThrow(() -> new RuntimeException("No found schedule"));
        if (!schedule.isAvailable()) {
            throw new RuntimeException("No available doctor in this time");
        }

        Appointment app = Appointment.builder()
                .doctor(schedule.getDoctor())
                .schedule(schedule)
                .appointmentDate(schedule.getDate())
                .appointmentTime(schedule.getStartTime())
                .status(AppointmentStatus.COMPLETED)
                .notes(request.getNotes())
                .patient(patient)
                .createdAt(LocalDateTime.now())
                .build();

        Appointment savedAppointment = appointmentRepository.save(app);

        AppointmentDTO dto = modelMapper.map(savedAppointment,AppointmentDTO.class);

        return ResponseDTO.<AppointmentDTO>builder()
                .statusCode(201)
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
}




















