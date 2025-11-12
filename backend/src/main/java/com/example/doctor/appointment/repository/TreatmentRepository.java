package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepository extends JpaRepository<Treatment,Long> {
}
