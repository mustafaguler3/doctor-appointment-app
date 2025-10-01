package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "departments")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String icon;
    private String name;
    private String shortDescription;
    private String description;
    @OneToMany(mappedBy = "department")
    private List<Doctor> doctors;
    private String location;
    @OneToMany(mappedBy = "department")
    private List<DepartmentPhoto> photos;
    private String phone;
    private String hours;

}



























