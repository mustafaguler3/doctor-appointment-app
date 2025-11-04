package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.AppointmentDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentDTO request) {
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }

    @GetMapping("/doctor/appointment-all")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> getAppointmentsByDoctor(){
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor());
    }

    @GetMapping("/doctor/appointments/{appointmentId}")
    public ResponseEntity<?> getDoctorAppointmentByDoctor(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.getAppointmentDetailByDoctor(appointmentId));
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<?> getAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.getAppointment(appointmentId));
    }

    @PutMapping("/me/{appointmentId}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentId));
    }

    @GetMapping("/me")
    public ResponseEntity<?> findPatientAppointments() {
        return ResponseEntity.ok(appointmentService.findPatientAppointments());
    }
}
