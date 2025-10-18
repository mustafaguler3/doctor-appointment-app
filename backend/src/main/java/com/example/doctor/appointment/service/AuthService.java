package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.UserDTO;
import com.example.doctor.appointment.dto.request.LoginRequestDTO;
import com.example.doctor.appointment.dto.request.RefreshTokenDTO;
import com.example.doctor.appointment.dto.request.RegisterRequestDTO;
import com.example.doctor.appointment.dto.response.AuthResponse;
import com.example.doctor.appointment.dto.response.LoginResponseDTO;
import com.example.doctor.appointment.entity.RefreshToken;
import com.example.doctor.appointment.entity.User;
import org.springframework.security.core.Authentication;

public interface AuthService {
    ResponseDTO<AuthResponse> login(LoginRequestDTO request);
    ResponseDTO<?> register(RegisterRequestDTO request);
    ResponseDTO<AuthResponse> refreshToken(RefreshTokenDTO request);
    ResponseDTO<UserDTO> getUserProfile(Authentication authentication);
}
