package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.DepartmentDTO;
import com.example.doctor.appointment.dto.ResponseDTO;

import java.util.List;

public interface DepartmentService {
    ResponseDTO<List<DepartmentDTO>> findAllDepartments();
}
