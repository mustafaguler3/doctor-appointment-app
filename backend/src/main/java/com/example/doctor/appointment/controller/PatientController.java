package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/{patientId}")
    public ResponseEntity<?> findPatientById(@PathVariable("patientId") Long patientId){
        return ResponseEntity.ok(patientService.getPatientById(patientId));
    }
    @GetMapping
    public ResponseEntity<?> findAllPatients(){
        return ResponseEntity.ok(patientService.findAllPatients());
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(Principal principal,
                                    @Valid @ModelAttribute PatientDTO patientDTO) throws IOException {

        return ResponseEntity.ok(patientService.update(principal,patientDTO));
    }
}





















