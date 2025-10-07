package com.example.doctor.appointment.controller;

import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final Path root = Paths.get(System.getProperty("user.dir"), "uploads");

    @PostMapping("/upload/{type}")
    public ResponseEntity<String> uploadFile(
            @PathVariable String type,
            @RequestParam("file") MultipartFile file) throws IOException {

        // Örn: uploads/doctor/
        Path typeDir = root.resolve(type);
        if (!Files.exists(typeDir)) {
            Files.createDirectories(typeDir);
        }

        String filename = file.getOriginalFilename();
        Path filePath = typeDir.resolve(filename);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // URL olarak döndür
        String fileUrl = "/images/" + type + "/" + filename;
        return ResponseEntity.ok(fileUrl);
    }

    @GetMapping("/{type}/{filename}")
    public ResponseEntity<?> getImage(
            @PathVariable String type,
            @PathVariable String filename) throws IOException {

        Path file = root.resolve(type).resolve(filename);
        if (!Files.exists(file)) {
            return ResponseEntity.notFound().build();
        }

        UrlResource resource = new UrlResource(file.toUri());
        String contentType = Files.probeContentType(file);
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
