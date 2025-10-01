package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.DoctorDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.Doctor;
import com.example.doctor.appointment.repository.DoctorRepository;
import com.example.doctor.appointment.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseDTO<List<DoctorDTO>> getDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();

        if (doctors.isEmpty()) {
            throw new RuntimeException("Doctors no found");
        }

        List<DoctorDTO> doctorDTOS = doctors.stream()
                .map(doctor -> modelMapper.map(doctor, DoctorDTO.class))
                .toList();

        return ResponseDTO.<List<DoctorDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("All doctors retrieved")
                .data(doctorDTOS)
                .build();
    }
}




















