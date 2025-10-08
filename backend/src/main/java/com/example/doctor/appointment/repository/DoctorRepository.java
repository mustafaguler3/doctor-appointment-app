package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {


    @Query("""
    SELECT d FROM Doctor d
    JOIN d.department dept
    WHERE 
        ((:city IS NULL OR LOWER(d.city) = LOWER(:city)))
        AND
        ((:departmentName IS NULL OR LOWER(dept.name) = LOWER(:departmentName)))
    """)
    List<Doctor> findByCityAndDepartment(
            @Param("city") String city,
            @Param("departmentName") String departmentName);
}
