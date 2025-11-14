package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "patients")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(length = 30)
    private String patientNo;
    private String insuranceNumber;
    private String bloodGroup;
    private String address;
    private String city;
    private String gender;
    private String state;
    private String zip;

    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;

    @OneToOne(mappedBy = "patient")
    private Prescription prescription;
}

























