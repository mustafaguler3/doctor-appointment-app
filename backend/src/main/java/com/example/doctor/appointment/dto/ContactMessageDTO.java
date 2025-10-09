package com.example.doctor.appointment.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ContactMessageDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String subject;
    private String message;
    private LocalDateTime createdAt = LocalDateTime.now();
}
