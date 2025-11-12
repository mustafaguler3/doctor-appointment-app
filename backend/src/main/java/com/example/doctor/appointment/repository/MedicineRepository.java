package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine,Long> {
}
