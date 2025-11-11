package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@Table(
        name = "schedules",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"doctor_id", "date"})
        }
)
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
    @OneToMany(mappedBy = "schedule",cascade = CascadeType.ALL)
    private List<TimeSlot> timeSlots;
    private int maxPatients;

    @OneToMany(mappedBy = "schedule",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Appointment> appointments;

}
