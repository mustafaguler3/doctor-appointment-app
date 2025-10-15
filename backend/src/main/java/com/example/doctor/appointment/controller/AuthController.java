package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.request.LoginRequestDTO;
import com.example.doctor.appointment.dto.request.RefreshTokenDTO;
import com.example.doctor.appointment.dto.request.RegisterRequestDTO;
import com.example.doctor.appointment.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        return ResponseEntity.ok(authService.getUserProfile(authentication));
    }
}


























