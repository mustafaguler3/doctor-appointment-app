package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

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
