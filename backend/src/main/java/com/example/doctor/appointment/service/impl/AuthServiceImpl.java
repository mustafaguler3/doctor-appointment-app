package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.dto.UserDTO;
import com.example.doctor.appointment.dto.request.RefreshTokenDTO;
import com.example.doctor.appointment.dto.request.RegisterRequestDTO;
import com.example.doctor.appointment.dto.response.AuthResponse;
import com.example.doctor.appointment.entity.Doctor;
import com.example.doctor.appointment.entity.Patient;
import com.example.doctor.appointment.entity.RefreshToken;
import com.example.doctor.appointment.entity.User;
import com.example.doctor.appointment.dto.request.LoginRequestDTO;
import com.example.doctor.appointment.enums.DoctorStatus;
import com.example.doctor.appointment.enums.Role;
import com.example.doctor.appointment.repository.DoctorRepository;
import com.example.doctor.appointment.repository.PatientRepository;
import com.example.doctor.appointment.repository.UserRepository;
import com.example.doctor.appointment.service.AuthService;
import com.example.doctor.appointment.service.JwtService;
import com.example.doctor.appointment.service.RefreshTokenService;
import com.example.doctor.appointment.util.UserDetailsImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    private final RefreshTokenService refreshTokenService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public ResponseDTO<AuthResponse> login(LoginRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        
        return ResponseDTO.<AuthResponse>builder()
                .message("Login successfully")
                .statusCode(HttpStatus.OK.value())
                .data(new AuthResponse(token,refreshToken.getToken()))
                .build();
    }

    @Transactional
    @Override
    public ResponseDTO<?> register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhoneNumber())
                .role(request.getRole())
                .status(true)
                .build();

        userRepository.save(user);

        if (request.getRole() == Role.PATIENT) {
            Patient patient = Patient.builder()
                    .user(user)
                    .patientNo(generatePatientNo())
                    .gender(request.getGender())
                    .state(request.getState())
                    .zip(request.getZip())
                    .build();
            patientRepository.save(patient);
        }
        else if (request.getRole() == Role.DOCTOR) {
            Doctor doctor = Doctor.builder()
                    .user(user)
                    .doctorNo(generateDoctorNo())
                    .designation(request.getDesignation())
                    .biography(request.getBiography())
                    .fee(request.getFee())
                    .status(DoctorStatus.ACTIVE)
                    .build();
            doctorRepository.save(doctor);
        }

        return ResponseDTO.builder()
                .statusCode(201)
                .message("User registered successfully as " + request.getRole())
                .build();
    }

    private String generatePatientNo() {
        return "P-" + System.currentTimeMillis();
    }

    private String generateDoctorNo() {
        return "D-" + System.currentTimeMillis();
    }

    @Override
    public ResponseDTO<AuthResponse> refreshToken(RefreshTokenDTO request) {
        String requestToken = request.getRefreshToken();
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(requestToken);
        User user = refreshToken.getUser();
        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        String newToken = jwtService.generateToken(userDetails);

        return ResponseDTO.<AuthResponse>builder()
                .message("Refreshed token successfully")
                .data(new AuthResponse(newToken,requestToken))
                .build();
    }

    @Override
    public ResponseDTO<UserDTO> getUserProfile(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email).get();

        UserDTO dto = modelMapper.map(user,UserDTO.class);
        return ResponseDTO.<UserDTO>builder()
                .data(dto)
                .build();
    }

}



























