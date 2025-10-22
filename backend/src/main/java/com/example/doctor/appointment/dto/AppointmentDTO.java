package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentDTO {

    private Long id;
    private DoctorDTO doctor;
    private PatientDTO patient;

    private AppointmentStatus status;
    private String notes;

    private ScheduleDTO schedule;
    private LocalTime appointmentTime;
    private LocalDateTime appointmentDate;

    private LocalDateTime createdAt;

}
