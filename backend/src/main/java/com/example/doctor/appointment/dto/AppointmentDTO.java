package com.example.doctor.appointment.dto;


import com.example.doctor.appointment.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class AppointmentDTO {
    private Long id;
    private AppointmentStatus status;
    private String notes;
    private Long doctorId;
    private Long scheduleId;
    private LocalDateTime createdAt;
}
