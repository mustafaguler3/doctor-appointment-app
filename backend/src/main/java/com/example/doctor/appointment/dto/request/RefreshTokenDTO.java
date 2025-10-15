package com.example.doctor.appointment.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class RefreshTokenDTO {
    @NotBlank
    private String refreshToken;
}
