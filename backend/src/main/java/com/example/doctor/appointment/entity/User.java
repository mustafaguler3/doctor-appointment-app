package com.example.doctor.appointment.entity;

import com.example.doctor.appointment.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String imageUrl;
    private String password;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean status = true;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Patient patient;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Doctor doctor;

}





















