package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.TreatmentDTO;

public interface TreatmentService {
    ResponseDTO<?> createTreatment(TreatmentDTO request);
}
