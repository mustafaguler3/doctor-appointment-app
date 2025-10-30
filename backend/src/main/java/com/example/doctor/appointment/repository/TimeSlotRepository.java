package com.example.doctor.appointment.repository;

import com.example.doctor.appointment.dto.TimeSlotDTO;
import com.example.doctor.appointment.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface TimeSlotRepository extends JpaRepository<TimeSlot,Long> {
    @Query("SELECT new com.example.doctor.appointment.entity.TimeSlot(t.id, t.time, t.available) " +
            "FROM Schedule s JOIN s.timeSlots t " +
            "WHERE s.date = :date AND s.doctor.id = :doctorId")
    List<TimeSlot> findSchedulesForDoctorByDate(@Param("doctorId") Long doctorId,
                                                   @Param("date") LocalDate date);

    boolean existsByTimeAndAvailable(LocalTime time,boolean available);
}
