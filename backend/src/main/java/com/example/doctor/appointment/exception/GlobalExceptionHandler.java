package com.example.doctor.appointment.exception;

import com.example.doctor.appointment.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseDTO<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseDTO.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message("Validation failed")
                .data(errors)
                .build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        ResponseDTO response = ResponseDTO.builder()
                .message(e.getMessage())
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .build();

        return ResponseEntity.ok(response);
    }
}



















