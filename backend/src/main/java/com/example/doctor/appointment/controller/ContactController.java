package com.example.doctor.appointment.controller;

import com.example.doctor.appointment.dto.ContactMessageDTO;
import com.example.doctor.appointment.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping("/save")
    public ResponseEntity<?> saveContactMessage(@RequestBody ContactMessageDTO request) {
        return ResponseEntity.ok(contactMessageService.sendMessage(request));
    }
}
