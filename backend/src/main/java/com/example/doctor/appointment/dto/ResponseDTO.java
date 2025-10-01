package com.example.doctor.appointment.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDTO<T> {
    private int statusCode;
    private T data;
    private String message;
}
