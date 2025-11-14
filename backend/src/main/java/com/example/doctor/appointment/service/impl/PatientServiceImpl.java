package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.PatientDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.UserDTO;
import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.entity.User;
import com.example.doctor.appointment.repository.PatientRepository;
import com.example.doctor.appointment.repository.UserRepository;
import com.example.doctor.appointment.service.FileStorageService;
import com.example.doctor.appointment.service.PatientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final FileStorageService fileStorageService;

    @Override
    public ResponseDTO<PatientDTO> getPatientById(Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Patient not found")
        );
        PatientDTO dto = modelMapper.map(patient,PatientDTO.class);
        return ResponseDTO.<PatientDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .data(dto)
                .build();
    }

    @Override
    public ResponseDTO<?> update(Principal principal, PatientDTO patientDTO) throws IOException {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        if (patientDTO.getUser() != null && patientDTO.getImageFile() != null && !patientDTO.getImageFile().isEmpty()) {
            String fileUrl = fileStorageService.storeFile(patientDTO.getImageFile(), "patient");
            //patientDTO.getUser().setImageUrl(fileUrl);
            user.setImageUrl(fileUrl);
            user.setFullName(patientDTO.getUser().getFullName());
            user.setPhone(patientDTO.getUser().getPhone());
            user.setUsername(patientDTO.getUser().getUsername());
        }

        patient.setBloodGroup(patientDTO.getBloodGroup());
        patient.setPatientNo(patientDTO.getPatientNo());
        patient.setGender(patientDTO.getGender());
        patient.setCity(patientDTO.getCity());
        patient.setAddress(patientDTO.getAddress());
        patient.setState(patientDTO.getState());
        patient.setZip(patientDTO.getZip());
        patient.setUser(user);
        user.setPatient(patient);

        patientRepository.save(patient);
        PatientDTO dto = modelMapper.map(patient,PatientDTO.class);

        return ResponseDTO.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Updated successfully")
                .data(dto)
                .build();
    }

    @Override
    public ResponseDTO<List<PatientDTO>> findAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        if (patients.isEmpty()) {
            throw new RuntimeException("Patients not found");
        }
        List<PatientDTO> dtos = patients.stream().map(
                patient -> modelMapper.map(patient,PatientDTO.class)
        ).toList();
        return ResponseDTO.<List<PatientDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .data(dtos)
                .build();
    }
}





















