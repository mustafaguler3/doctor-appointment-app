package com.example.doctor.appointment.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ScheduleResponseDTO {
    private LocalDate date;
    private List<TimeSlotDTO> timeSlots;
}
