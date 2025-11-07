package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.AppointmentDTO;
import com.example.doctor.appointment.dto.DoctorAppointmentDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    ResponseDTO<AppointmentDTO> createAppointment(AppointmentDTO request);
    ResponseDTO<List<AppointmentDTO>> findPatientAppointments();
    ResponseDTO<AppointmentDTO> getAppointment(Long appointmentId);
    ResponseDTO<String> cancelAppointment(Long appointmentId);
    ResponseDTO<Page<DoctorAppointmentDTO>> getAppointmentsByDoctor(int page,int pageSize);
    ResponseDTO<DoctorAppointmentDTO> getAppointmentDetailByDoctor(Long appointmentId);
    ResponseDTO<List<DoctorAppointmentDTO>> getTodayAppointmentsByDoctor();
}
