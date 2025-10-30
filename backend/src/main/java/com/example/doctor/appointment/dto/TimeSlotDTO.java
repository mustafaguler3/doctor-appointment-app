package com.example.doctor.appointment.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TimeSlotDTO {

    private Long id;
    private LocalTime time;
    private boolean available = true;
    private int bookedPatients;
    @JsonManagedReference
    private ScheduleDTO schedule;

    public TimeSlotDTO(Long id,LocalTime time, boolean available) {
        this.id = id;
        this.time = time;
        this.available = available;
    }

    public TimeSlotDTO(LocalTime time, boolean available) {
        this.time = time;
        this.available = available;
    }
}
