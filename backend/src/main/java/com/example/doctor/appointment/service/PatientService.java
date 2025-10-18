package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.dto.ResponseDTO;

import java.security.Principal;

public interface PatientService {
    ResponseDTO<?> update(Principal principal, PatientDTO patientDTO);
}
