package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "prescriptions")
@Builder
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false, unique = true)
    private Appointment appointment;
    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medicine> medicines = new ArrayList<>();
    @Column(length = 1000)
    private String advice;
    @ElementCollection
    @CollectionTable(name = "prescription_symptoms", joinColumns = @JoinColumn(name = "prescription_id"))
    @Column(name = "symptom")
    private List<String> symptoms = new ArrayList<>();
    @ElementCollection
    @CollectionTable(name = "prescription_diagnosis", joinColumns = @JoinColumn(name = "prescription_id"))
    @Column(name = "diagnosis")
    private List<String> diagnosis = new ArrayList<>();
    private LocalDate issueDate = LocalDate.now();
}




























