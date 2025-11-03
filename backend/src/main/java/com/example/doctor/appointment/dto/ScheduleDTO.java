package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Doctor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleDTO {
    private Long id;
    private Long doctorId;
    @JsonBackReference("s")
    private DoctorDTO doctor;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private int maxPatients;
    @JsonManagedReference("t")
    private List<TimeSlotDTO> timeSlots;
}
