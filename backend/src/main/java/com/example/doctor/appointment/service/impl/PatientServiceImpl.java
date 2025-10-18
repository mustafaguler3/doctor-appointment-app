package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.UserDTO;
import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.entity.User;
import com.example.doctor.appointment.repository.PatientRepository;
import com.example.doctor.appointment.repository.UserRepository;
import com.example.doctor.appointment.service.PatientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseDTO<?> update(Principal principal, PatientDTO patientDTO) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        user.setFullName(patientDTO.getUser().getFullName());
        user.setPhone(patientDTO.getUser().getPhone());
        user.setUsername(patientDTO.getUser().getUsername());

        patient.setBloodGroup(patientDTO.getBloodGroup());
        patient.setPatientNo(patientDTO.getPatientNo());
        patient.setGender(patientDTO.getGender());
        patient.setCity(patientDTO.getCity());
        patient.setAddress(patientDTO.getAddress());
        patient.setState(patientDTO.getState());
        patient.setZip(patientDTO.getZip());
        patient.setUser(user);
        user.setPatient(patient);

        User savedUser = userRepository.save(user);
        patientRepository.save(patient);
        UserDTO userDto = modelMapper.map(savedUser, UserDTO.class);
        PatientDTO dto = modelMapper.map(patient,PatientDTO.class);

        return ResponseDTO.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Updated successfully")
                .data(dto)
                .build();
    }
}





















