package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.TreatmentDTO;
import com.example.doctor.appointment.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/treatments")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentService treatmentService;

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> createTreatment(@RequestBody TreatmentDTO request) {
        return ResponseEntity.ok(treatmentService.createTreatment(request));
    }
}
