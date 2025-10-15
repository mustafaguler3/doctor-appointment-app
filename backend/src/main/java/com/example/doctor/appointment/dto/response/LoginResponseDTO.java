package com.example.doctor.appointment.dto.response;

import com.example.doctor.appointment.dto.UserDTO;
import lombok.Data;

@Data
public class LoginResponseDTO {
    private String token;
    private String role;
    private String message;
    private UserDTO user;
}
