package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.DepartmentDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.Department;
import com.example.doctor.appointment.repository.DepartmentRepository;
import com.example.doctor.appointment.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseDTO<List<DepartmentDTO>> findAllDepartments() {
        List<Department> departments = departmentRepository.findAll();

        if (departments.isEmpty()) {
            throw new RuntimeException("No any department");
        }

        List<DepartmentDTO> departmentDTOS =
                departments.stream()
                .map(deparment -> modelMapper.map(deparment,DepartmentDTO.class))
                .toList();

        return ResponseDTO.<List<DepartmentDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("retrieved all departments")
                .data(departmentDTOS)
                .build();
    }
}
















