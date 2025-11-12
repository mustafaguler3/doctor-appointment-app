package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class PrescriptionDTO {
    private Long id;
    private DoctorDTO doctor;
    private PatientDTO patient;
    @JsonManagedReference("app-pres")
    private AppointmentDTO appointment;
    @JsonManagedReference("m")
    private List<MedicineDTO> medicines;
    @JsonBackReference("treatment-prescription")
    private TreatmentDTO treatment;
    private String advice;
    private List<String> symptoms;
    private List<String> diagnosis;
    private LocalDate issueDate;
}
