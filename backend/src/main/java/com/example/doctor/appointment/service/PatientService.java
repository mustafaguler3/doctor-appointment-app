package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface PatientService {
    ResponseDTO<?> update(Principal principal, PatientDTO patientDTO) throws IOException;
}
