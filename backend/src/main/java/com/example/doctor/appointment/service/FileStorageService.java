package com.example.doctor.appointment.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileStorageService {
    String storeFile(MultipartFile file, String type) throws IOException;
}
