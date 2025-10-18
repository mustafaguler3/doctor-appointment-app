package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/update")
    public ResponseEntity<?> update(Principal principal,
                                    @Valid @RequestBody PatientDTO patientDTO) {
        return ResponseEntity.ok(patientService.update(principal,patientDTO));
    }
}





















