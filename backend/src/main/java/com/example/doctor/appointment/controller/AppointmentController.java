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
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/appointments")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentDTO request) {
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }

    @GetMapping("/patients/me/appointments")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<?> getPatientAppointments() {
        return ResponseEntity.ok(appointmentService.findPatientAppointments());
    }

    @GetMapping("/patient/me/appointments/{appointmentId}")
    public ResponseEntity<?> getPatientAppointmentById(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.getAppointment(appointmentId));
    }

    @PatchMapping("/patients/me/appointments/{appointmentId}")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<?> cancelPatientAppointment(
            @PathVariable Long appointmentId,
            @RequestBody Map<String, String> updateRequest // ör: {"status": "CANCELLED"}
    ) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentId));
    }

    @GetMapping("/doctors/me/appointments")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> getDoctorAppointments(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "5") int pageSize
    ) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(pageNumber,pageSize));
    }

    @GetMapping("/doctors/me/appointments/today")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> getDoctorTodayAppointments() {
        return ResponseEntity.ok(appointmentService.getTodayAppointmentsByDoctor());
    }

    @GetMapping("/doctors/me/appointments/{appointmentId}")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> getDoctorAppointmentDetail(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.getAppointmentDetailByDoctor(appointmentId));
    }

    @GetMapping("/appointments/{appointmentId}")
    public ResponseEntity<?> getAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.getAppointment(appointmentId));
    }
}
