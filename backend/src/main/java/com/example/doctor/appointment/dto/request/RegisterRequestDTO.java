package com.example.doctor.appointment.dto.request;

import com.example.doctor.appointment.enums.Role;
import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String fullName;
    private String designation;
    private String biography;
    private String insuranceNumber;
    private String bloodGroup;
    private String gender;
    private String state;
    private String zip;
    private double fee;
    private String email;
    private String password;
    private String phoneNumber;
    private String imageUrl;
    private Role role;
}
