package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.service.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path rootLocation = Paths.get("uploads");

    @Override
    public String storeFile(MultipartFile file, String type) throws IOException {

        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }

        Path typeDir = rootLocation.resolve(type);
        if (!Files.exists(typeDir)) {
            Files.createDirectories(typeDir);
        }

        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path destinationFile = typeDir.resolve(Paths.get(filename)).normalize().toAbsolutePath();

        Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

        return "/images/" + type + "/" + filename;
    }
}
























