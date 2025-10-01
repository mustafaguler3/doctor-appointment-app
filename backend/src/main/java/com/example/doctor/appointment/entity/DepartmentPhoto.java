package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "department_photos")
public class DepartmentPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    private String photo;
}
