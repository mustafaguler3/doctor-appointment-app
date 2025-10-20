package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/{doctorId}")
    public ResponseEntity<?> findDoctorById(@PathVariable("doctorId") Long doctorId) {
        return ResponseEntity.ok(doctorService.getDoctorById(doctorId));
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
