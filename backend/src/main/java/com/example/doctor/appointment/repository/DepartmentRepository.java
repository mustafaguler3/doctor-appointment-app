package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department,Long> {
}
