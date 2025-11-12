package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Prescription;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicineDTO {
    private Long id;
    private Integer sNo;
    private String name;
    private String dosage;
    private String medicineType;
    private String takenTime;
    private String schedule;
    private String totalDays;
    private String instructions;
    @JsonBackReference("m")
    private PrescriptionDTO prescription;
}
