package com.example.doctor.appointment.service;


import com.example.doctor.appointment.entity.RefreshToken;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(Long userId);
    RefreshToken validateRefreshToken(String token);
}


















