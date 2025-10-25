package com.example.doctor.appointment.dto.request;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
    private String role;
    private String loginType;
}
