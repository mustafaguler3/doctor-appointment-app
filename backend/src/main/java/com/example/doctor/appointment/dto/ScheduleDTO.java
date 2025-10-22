package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Doctor;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleDTO {
    private Long id;
    private Long doctorId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean available;
    private int maxPatients;
}
