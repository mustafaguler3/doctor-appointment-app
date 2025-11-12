package com.example.doctor.appointment.dto;


import com.example.doctor.appointment.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppointmentDTO {
    private Long id;
    private AppointmentStatus status;
    private String notes;
    private Long doctorId;
    @JsonBackReference("ap")
    private TreatmentDTO treatment;
    private String fullName;
    private String departmentName;
    @JsonBackReference("a")
    private DoctorDTO doctor;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Long timeSlotId;
    private Long scheduleId;
    private LocalDateTime createdAt;
    @JsonBackReference("app-pres")
    private PrescriptionDTO prescription;
}
