package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.MedicineDTO;
import com.example.doctor.appointment.dto.PrescriptionDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.TreatmentDTO;
import com.example.doctor.appointment.entity.*;
import com.example.doctor.appointment.enums.AppointmentStatus;
import com.example.doctor.appointment.repository.*;
import com.example.doctor.appointment.service.TreatmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TreatmentServiceImpl implements TreatmentService {

    private final TreatmentRepository treatmentRepository;
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicineRepository medicineRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public ResponseDTO<?> createTreatment(TreatmentDTO request) {

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getStatus() != AppointmentStatus.PENDING) {
            throw new RuntimeException(
                    "Treatment cannot be assigned because the appointment is not pending (current status: "
                            + appointment.getStatus() + ")");
        }

        Patient patient = patientRepository.findById(appointment.getPatient().getId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Treatment treatment = Treatment.builder()
                .advice(request.getAdvice())
                .pulse(request.getPulse())
                .temperature(request.getTemperature())
                .respiration(request.getRespiration())
                .tests(request.getTests())
                .bloodPressure(request.getBloodPressure())
                .height(request.getHeight())
                .weight(request.getWeight())
                .problemDescription(request.getProblemDescription())
                .appointment(appointment)
                .build();

            Prescription prescription = Prescription.builder()
                    .appointment(appointment)
                    .patient(patient)
                    .doctor(doctor)
                    .issueDate(LocalDate.now())
                    .diagnosis(request.getPrescription().getDiagnosis())
                    .symptoms(request.getPrescription().getSymptoms())
                    .advice(treatment.getAdvice())
                    .build();

            treatment.setPrescriptions(List.of(prescription));

        treatmentRepository.save(treatment);

        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);

        return ResponseDTO.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Treatment created successfully with prescriptions and medicines.")
                .build();
    }
}













