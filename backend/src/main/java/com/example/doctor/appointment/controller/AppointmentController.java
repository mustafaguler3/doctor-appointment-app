package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.AppointmentDTO;
import com.example.doctor.appointment.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/new")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentDTO request) {
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> findPatientAppointments() {
        return ResponseEntity.ok(appointmentService.findPatientAppointments());
    }
}
