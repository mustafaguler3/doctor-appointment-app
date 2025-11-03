package com.example.doctor.appointment.dto;

import com.example.doctor.appointment.entity.DepartmentPhoto;
import com.example.doctor.appointment.entity.Doctor;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class DepartmentDTO {
    private Long id;
    private String icon;
    private String name;
    private String shortDescription;
    private String description;
    @JsonManagedReference("d")
    private List<DoctorDTO> doctors;
    private String location;
    private List<DepartmentPhoto> photos;
    private String phone;
    private String hours;
}
