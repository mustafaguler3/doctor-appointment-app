package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.DoctorDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.Doctor;

import java.util.List;

public interface DoctorService {
    ResponseDTO<List<DoctorDTO>> getDoctors();
}
