package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.ScheduleDTO;
import com.example.doctor.appointment.dto.TimeSlotDTO;
import com.example.doctor.appointment.entity.Schedule;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ScheduleService {
    ResponseDTO<ScheduleDTO> createScheduleWithTimeSlots(ScheduleDTO dto);
    ResponseDTO<List<TimeSlotDTO>> generateTimeSlots(LocalTime start,LocalTime end,List<LocalTime> bookedTimes);
    ResponseDTO<List<TimeSlotDTO>> getSchedulesForDoctorByDate(Long doctorId, LocalDate date);
}
