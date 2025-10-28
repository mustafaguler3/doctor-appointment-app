package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findAppointmentByDoctorIdAndAppointmentDate(Long doctorId, LocalDate time);
    List<Appointment> findAppointmentsByPatientId(Long patientId);
}
