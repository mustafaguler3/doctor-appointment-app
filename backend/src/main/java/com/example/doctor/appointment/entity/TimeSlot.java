package com.example.doctor.appointment.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
@Data
@Entity
@NoArgsConstructor
public class TimeSlot {
    @Id
    @GeneratedValue
    private Long id;
    private LocalTime time;
    private boolean available;
    private int bookedPatients;
    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;



    public TimeSlot(Long id, LocalTime time, boolean available) {
        this.id = id;
        this.time = time;
        this.available = available;
    }
}
