package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.service.AppointmentService;
import com.example.doctor.appointment.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final AppointmentService appointmentService;

    @GetMapping("/{doctorId}")
    public ResponseEntity<?> findDoctorById(@PathVariable("doctorId") Long doctorId) {
        return ResponseEntity.ok(doctorService.getDoctorById(doctorId));
    }

    @GetMapping("/appointments/today")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> findDoctorAppointmentByToday() {
        return ResponseEntity.ok(appointmentService.getTodayAppointmentsByDoctor());
    }
    @GetMapping
    public ResponseEntity<?> findDoctors(){
        return ResponseEntity.ok(doctorService.getDoctors());
    }

    @GetMapping("/search")
    public ResponseEntity<?> findDoctorsByQueries(@RequestParam(required = false) String city,
                                                  @RequestParam(required = false) String departmentName) {
        return ResponseEntity.ok(doctorService.getDoctorsByCityAndDepartment(city,departmentName));
    }
}
