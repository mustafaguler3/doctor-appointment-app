package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.AppointmentDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.Appointment;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface AppointmentService {
    ResponseDTO<AppointmentDTO> createAppointment(AppointmentDTO request);
    ResponseDTO<List<AppointmentDTO>> findPatientAppointments();
}
