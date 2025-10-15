package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Doctor;
import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.enums.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String imageUrl;
    private String password;
    private String phone;
    private Role role;
    private boolean status = true;
    @JsonBackReference
    private PatientDTO patient;
    @JsonBackReference
    private DoctorDTO doctor;
}
