package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.dto.DoctorAppointmentDTO;
import com.example.doctor.appointment.entity.Appointment;
import com.example.doctor.appointment.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    List<Appointment> findAppointmentsByPatientId(Long patientId);
    boolean existsByPatientIdAndStatusIn(Long patientId, List<AppointmentStatus> statuses);

    @Query("SELECT a FROM Appointment a where a.doctor.id = :doctorId AND a.appointmentDate = :today")
    List<Appointment> findTodayAppointmentsForDoctor(@Param("doctorId") Long doctorId,
                                                           @Param("today") LocalDate date);
}
