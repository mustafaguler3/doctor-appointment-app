package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

public interface PatientService {
    ResponseDTO<PatientDTO> getPatientById(Long id);
    ResponseDTO<?> update(Principal principal, PatientDTO patientDTO) throws IOException;
    ResponseDTO<List<PatientDTO>> findAllPatients();
}
