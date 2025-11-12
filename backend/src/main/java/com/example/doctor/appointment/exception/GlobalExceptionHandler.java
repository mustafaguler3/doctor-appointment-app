package com.example.doctor.appointment.exception;

import com.example.doctor.appointment.dto.ResponseDTO;
import com.fasterxml.jackson.databind.exc.InvalidDefinitionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.LinkedHashMap;
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

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ResponseDTO<Object>> handleMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .body(ResponseDTO.builder()
                        .statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value())
                        .message("Content-Type not supported. Use application/json")
                        .data(null)
                        .build());
    }
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleJsonParseError(HttpMessageNotReadableException ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid JSON input: " + ex.getMessage());
    }
    @ExceptionHandler(InvalidDefinitionException.class)
    public ResponseEntity<String> handleInvalidDefinition(InvalidDefinitionException ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Invalid definition: " + ex.getPathReference());
    }
    @ExceptionHandler(JpaSystemException.class)
    public ResponseEntity<Map<String, Object>> handleJpaSystemException(JpaSystemException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("statusCode", 500);
        body.put("message", ex.getMessage());

        StackTraceElement[] stackTrace = ex.getStackTrace();
        if (stackTrace.length > 0) {
            StackTraceElement origin = stackTrace[0];
            body.put("class", origin.getClassName());
            body.put("method", origin.getMethodName());
            body.put("line", origin.getLineNumber());
        }

        for (StackTraceElement element : ex.getStackTrace()) {
            System.out.println(element.toString());
        }

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("statusCode", 500);
        body.put("message", ex.getMessage());

        StackTraceElement[] stackTrace = ex.getStackTrace();
        if (stackTrace.length > 0) {
            StackTraceElement origin = stackTrace[0];
            body.put("class", origin.getClassName());
            body.put("method", origin.getMethodName());
            body.put("line", origin.getLineNumber());
        }

        for (StackTraceElement element : ex.getStackTrace()) {
            System.out.println(element.toString());
        }

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(StackOverflowError.class)
    public ResponseEntity<Map<String, Object>> handleStackOverflow(StackOverflowError ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("statusCode", 500);
        body.put("message", "StackOverflowError: Check bidirectional references in DTOs/Entities");
        body.put("class", ex.getStackTrace()[0].getClassName());
        body.put("method", ex.getStackTrace()[0].getMethodName());
        body.put("line", ex.getStackTrace()[0].getLineNumber());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}



















