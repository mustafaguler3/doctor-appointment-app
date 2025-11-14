package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    private Long id;
    @NotNull(message = "User cannot be null")
    @Valid
    private UserDTO user;
    private List<AppointmentDTO> appointments;
    @NotBlank(message = "Address cannot be empty")
    private String address;
    @NotBlank(message = "City cannot be empty")
    private String city;
    @Size(max = 20, message = "PatientNo cannot be longer than 20 characters")
    private String patientNo;
    @Size(max = 50)
    private String insuranceNumber;
    @NotBlank(message = "Blood group cannot be empty")
    private String bloodGroup;
    @NotBlank(message = "Gender cannot be empty")
    private String gender;
    @NotBlank(message = "State cannot be empty")
    private String state;
    @NotBlank(message = "Zip cannot be empty")
    private String zip;
    private MultipartFile imageFile;
}
