package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Appointment;
import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.entity.Prescription;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreatmentDTO {
    private Long id;
    private String height;
    private Long appointmentId;
    private String weight;
    private String temperature;
    private String pulse;
    private String respiration;
    private String bloodPressure;
    private String problemDescription;
    private String tests;
    private String advice;
    @JsonManagedReference("treatment-prescription")
    private PrescriptionDTO prescription;
}
