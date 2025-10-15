package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query("select u from User u where u.email =:email")
    Optional<User> findByEmail(@Param("email") String email);
    User findUserById(Long id);
    boolean existsByEmail(String email);
}
