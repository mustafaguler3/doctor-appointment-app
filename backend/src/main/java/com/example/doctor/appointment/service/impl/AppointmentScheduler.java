package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.entity.Appointment;
import com.example.doctor.appointment.enums.AppointmentStatus;
import com.example.doctor.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentScheduler {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void updateExpiredAppointments() {
        LocalDate now = LocalDate.now();
        List<Appointment> expired = appointmentRepository.findAllByAppointmentDateBeforeAndStatus(
                now, AppointmentStatus.PENDING
        );

        for (Appointment a : expired) {
            a.setStatus(AppointmentStatus.COMPLETED);
        }

        appointmentRepository.saveAll(expired);
    }
}
