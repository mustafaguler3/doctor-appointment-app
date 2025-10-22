package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.ScheduleDTO;
import com.example.doctor.appointment.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    ResponseDTO<List<ScheduleDTO>> findDoctorSchedulesById(Long id);
}
