package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.ScheduleDTO;
import com.example.doctor.appointment.entity.Schedule;
import com.example.doctor.appointment.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/new")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<?> createSchedule(@Valid @RequestBody ScheduleDTO dto) {
        return ResponseEntity.ok(scheduleService.createScheduleWithTimeSlots(dto));
    }

    @GetMapping("/doctor")
    public ResponseEntity<?> findSchedulesByDoctor(@RequestParam Long doctorId,
                                                   @RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(scheduleService.getSchedulesForDoctorByDate(doctorId,date));
    }
}
