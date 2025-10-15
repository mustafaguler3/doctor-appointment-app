package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.RefreshToken;
import com.example.doctor.appointment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
}
