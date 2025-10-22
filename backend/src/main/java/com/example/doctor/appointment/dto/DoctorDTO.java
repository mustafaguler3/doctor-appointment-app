package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.Appointment;
import com.example.doctor.appointment.entity.Department;
import com.example.doctor.appointment.entity.User;
import com.example.doctor.appointment.enums.DoctorStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DoctorDTO {
    private Long id;
    private Long userId;
    private UserDTO user;
    private Long departmentId;
    @JsonManagedReference
    private DepartmentDTO department;
    private String doctorNo;
    private String designation;
    private String biography;
    private String address;
    private String city;
    private String state;
    private String zip;
    private Double fee;
    private String signature;
    private List<ScheduleDTO> schedules;
    private DoctorStatus status;
    @JsonIgnore
    private List<Appointment> appointments;

}
