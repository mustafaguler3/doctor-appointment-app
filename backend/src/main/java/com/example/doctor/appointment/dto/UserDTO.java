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

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    private Long patientId;
    @Size(max = 50, message = "Username cannot exceed 50 characters")
    private String username;
    @NotBlank(message = "Full name is required")
    private String fullName;
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    private String imageUrl;
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    private String phone;
    private Role role;
    private boolean status = true;
}
