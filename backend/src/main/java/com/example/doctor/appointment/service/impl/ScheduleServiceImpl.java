package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.ScheduleDTO;
import com.example.doctor.appointment.entity.Doctor;
import com.example.doctor.appointment.entity.Schedule;
import com.example.doctor.appointment.repository.DoctorRepository;
import com.example.doctor.appointment.repository.ScheduleRepository;
import com.example.doctor.appointment.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;
    @Override
    public ResponseDTO<List<ScheduleDTO>> findDoctorSchedulesById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No doctor"));

        List<Schedule>
                schedules = scheduleRepository.findSchedulesByDoctorId(doctor.getId());

        List<ScheduleDTO> dtos = schedules.stream().map(
                schedule -> modelMapper.map(schedule, ScheduleDTO.class)
        ).toList();

        return ResponseDTO.<List<ScheduleDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .data(dtos)
                .build();
    }
}




















