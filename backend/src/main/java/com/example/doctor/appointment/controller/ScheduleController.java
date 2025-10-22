package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<?> findSchedulesByDoctor(@RequestParam Long doctorId) {
        return ResponseEntity.ok(scheduleService.findDoctorSchedulesById(doctorId));
    }
}
