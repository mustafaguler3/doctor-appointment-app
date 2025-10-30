package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.ScheduleDTO;
import com.example.doctor.appointment.dto.TimeSlotDTO;
import com.example.doctor.appointment.entity.Doctor;
import com.example.doctor.appointment.entity.Schedule;
import com.example.doctor.appointment.entity.TimeSlot;
import com.example.doctor.appointment.repository.DoctorRepository;
import com.example.doctor.appointment.repository.ScheduleRepository;
import com.example.doctor.appointment.repository.TimeSlotRepository;
import com.example.doctor.appointment.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseDTO<ScheduleDTO> createScheduleWithTimeSlots(ScheduleDTO dto) {
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Schedule schedule = new Schedule();
        schedule.setDoctor(doctor);
        schedule.setDate(dto.getDate());
        schedule.setStartTime(dto.getStartTime());
        schedule.setMaxPatients(dto.getMaxPatients());
        schedule.setEndTime(dto.getEndTime());
        scheduleRepository.save(schedule);

        LocalTime time = dto.getStartTime();
        while (time.isBefore(dto.getEndTime())) {
            TimeSlot slot = new TimeSlot();
            slot.setSchedule(schedule);
            slot.setTime(time);
            slot.setAvailable(true);
            timeSlotRepository.save(slot);
            time = time.plusMinutes(10);
        }

        ScheduleDTO responseDto = modelMapper.map(schedule, ScheduleDTO.class);

        return ResponseDTO.<ScheduleDTO>builder()
                .statusCode(HttpStatus.CREATED.value())
                .data(responseDto)
                .message("Schedule and timeslots created successfully")
                .build();
    }
    @Override
    public ResponseDTO<List<TimeSlotDTO>> generateTimeSlots(LocalTime start, LocalTime end, List<LocalTime> bookedTimes) {
        List<TimeSlotDTO> slots = new ArrayList<>();
        LocalTime current = start;

        while (current.isBefore(end)) {
            boolean isBooked = bookedTimes.contains(current);
            slots.add(new TimeSlotDTO(current,!isBooked));
            current = current.plusMinutes(10);
        }

        return ResponseDTO.<List<TimeSlotDTO>>builder()
                .data(slots)
                .build();
    }

    @Override
    public ResponseDTO<List<TimeSlotDTO>> getSchedulesForDoctorByDate(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        List<TimeSlot> timeSlot =
                timeSlotRepository.findSchedulesForDoctorByDate(doctor.getId(), date);

        List<TimeSlotDTO> dtos = timeSlot.stream()
                .map(timeSlot1 -> modelMapper.map(timeSlot1,TimeSlotDTO.class)).toList();

        return ResponseDTO.<List<TimeSlotDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .data(dtos)
                .build();
    }
}




















