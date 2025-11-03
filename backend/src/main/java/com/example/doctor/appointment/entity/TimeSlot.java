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
    private boolean reopenedAfterCancel = false;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    public void markAsBooked() {
        this.available = false;
        this.reopenedAfterCancel = false;
    }

    public void markAsCancelled() {
        this.available = true;
        this.reopenedAfterCancel = true;
    }

    public TimeSlot(Long id, LocalTime time, boolean available) {
        this.id = id;
        this.time = time;
        this.available = available;
    }
}
