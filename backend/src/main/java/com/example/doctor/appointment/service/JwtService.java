package com.example.doctor.appointment.service;

import com.example.doctor.appointment.util.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    <T> T extractClaim(String token, Function<Claims,T> claimsResolver);
    String buildToken(Map<String, Object> claims, String subject);
    String generateToken(UserDetailsImpl userDetails);
    boolean validateToken(String token, UserDetails userDetails);
    String extractUsername(String token);
    boolean isTokenExpired(String token);
    Claims extractAllClaims(String token);
}
