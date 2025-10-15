package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {
}
