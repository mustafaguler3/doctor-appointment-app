package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorAppointmentDTO {
    private Long id;
    private String patientNo;
    private String patientName;
    private String departmentName;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private AppointmentStatus status;
    private String notes;
    private String patientEmail;
    private String gender;
    private String age;
    private String bloodGroup;
    private String phoneNumber;
}
