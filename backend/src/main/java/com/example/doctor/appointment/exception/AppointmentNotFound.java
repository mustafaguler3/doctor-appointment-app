package com.example.doctor.appointment.exception;

public class AppointmentNotFound extends RuntimeException {
    public AppointmentNotFound(String message) {
        super(message);
    }
}
