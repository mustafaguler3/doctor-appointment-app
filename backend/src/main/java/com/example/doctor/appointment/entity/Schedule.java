package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Data
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean available;
    private int maxPatients;

    @OneToMany(mappedBy = "schedule")
    private List<Appointment> appointments;

    // 10 dakikalık slotları ve doluluk kontrolü
    public List<TimeSlot> generateTimeSlots() {
        List<TimeSlot> slots = Stream.iterate(startTime, t -> t.plusMinutes(10))
                .limit(Duration.between(startTime, endTime).toMinutes() / 10)
                .map(time -> {
                    long bookedCount = appointments.stream()
                            .filter(a -> a.getTime().equals(time))
                            .count();
                    return new TimeSlot(time, bookedCount < maxPatients);
                })
                .collect(Collectors.toList());
        return slots;
    }
}
