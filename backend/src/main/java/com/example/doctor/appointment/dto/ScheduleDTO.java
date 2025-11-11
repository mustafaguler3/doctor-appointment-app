package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Doctor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleDTO {
    private Long id;
    @JsonBackReference("s")
    private DoctorDTO doctor;
    @NotNull(message = "Date must not be null")
    private LocalDate date;
    @NotNull(message = "Start time must not be null")
    private LocalTime startTime;
    @NotNull(message = "End time must not be null")
    private LocalTime endTime;
    @Min(value = 1, message = "Patient count must be at least 1")
    @Max(value = 20, message = "Patient count must be max 20")
    private int maxPatients;
    @JsonManagedReference("t")
    private List<TimeSlotDTO> timeSlots;
}
