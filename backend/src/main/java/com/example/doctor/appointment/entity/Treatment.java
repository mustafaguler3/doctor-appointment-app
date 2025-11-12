package com.example.doctor.appointment.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "treatments")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Treatment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    private String height;
    private String weight;
    private String temperature;
    private String pulse;
    private String respiration;
    private String bloodPressure;
    private String problemDescription;
    private String tests;
    private String advice;
    @OneToMany(mappedBy = "treatment", cascade = CascadeType.ALL, orphanRemoval = true,
    fetch = FetchType.LAZY)
    private List<Prescription> prescriptions;
}
