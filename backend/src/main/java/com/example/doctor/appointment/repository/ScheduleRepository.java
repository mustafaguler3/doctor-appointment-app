package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    List<Schedule> findSchedulesByDoctorId(Long doctorId);
}
