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
    public ResponseDTO<DoctorDTO> getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return ResponseDTO.<DoctorDTO>builder()
                .statusCode(HttpStatus.OK.value())
                .data(modelMapper.map(doctor,DoctorDTO.class))
                .build();
    }

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

    @Override
    public ResponseDTO<List<DoctorDTO>> getDoctorsByCityAndDepartment(String city, String departmentName) {
        List<Doctor> doctors = doctorRepository.findByCityAndDepartment(city,departmentName);

        if (doctors.isEmpty()) {
            String message;

            if (city != null && !city.isEmpty() && departmentName != null && !departmentName.isEmpty()) {
                message = String.format("No doctors found in '%s' city for the '%s' department.", city, departmentName);
            } else if (city != null && !city.isEmpty()) {
                message = String.format("No doctors found in '%s' city.", city);
            } else if (departmentName != null && !departmentName.isEmpty()) {
                message = String.format("No doctors found in the '%s' department.", departmentName);
            } else {
                message = "No doctors found.";
            }

            throw new RuntimeException(message);
            // return ResponseDTO.<List<DoctorDTO>>builder()
            //         .statusCode(HttpStatus.OK.value())
            //         .data(Collections.emptyList())
            //         .message(message)
            //         .build();
        }

        List<DoctorDTO> doctorDTOS = doctors
                .stream()
                .map(doctor -> modelMapper.map(doctor,DoctorDTO.class))
                .toList();

        return ResponseDTO.<List<DoctorDTO>>builder()
                .statusCode(HttpStatus.OK.value())
                .data(doctorDTOS)
                .message("all retrieved")
                .build();
    }

    /*public class DoctorSpecification {
        public static Specification<Doctor> hasCity(String city) {
            return (root, query, cb) -> city == null ? null : cb.equal(root.get("city"), city);
        }

        public static Specification<Doctor> hasDepartment(String departmentName) {
            return (root, query, cb) -> departmentName == null ? null :
                    cb.equal(root.join("department").get("name"), departmentName);
        }
    } */
}




















