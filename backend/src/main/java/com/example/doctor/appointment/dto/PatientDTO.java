package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class PatientDTO {
    private Long id;
    @JsonManagedReference
    private UserDTO user;
    private String patientNo;
    private String insuranceNumber;
    private String bloodGroup;
    private String gender;
    private String state;
    private String zip;
}
