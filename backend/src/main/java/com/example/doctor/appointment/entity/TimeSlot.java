package com.example.doctor.appointment.entity;

import java.time.LocalTime;

public record TimeSlot(LocalTime time, boolean available) {}
