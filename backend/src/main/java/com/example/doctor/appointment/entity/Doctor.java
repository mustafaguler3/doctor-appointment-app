package com.example.doctor.appointment.entity;

import com.example.doctor.appointment.enums.DoctorStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doctors")
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private String doctorNo;
    private String designation; // prof, uzm
    private String biography;
    private String address;
    private String city;
    private String state;
    private String zip;
    private Double fee;
    private String signature;
    @Enumerated(EnumType.STRING)
    private DoctorStatus status; // active
    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;
}






















