package com.example.doctor.appointment.service.impl;

import com.example.doctor.appointment.dto.ContactMessageDTO;
import com.example.doctor.appointment.dto.ResponseDTO;
import com.example.doctor.appointment.entity.ContactMessage;
import com.example.doctor.appointment.repository.ContactMessageRepository;
import com.example.doctor.appointment.service.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final ModelMapper modelMapper;
    @Override
    public ResponseDTO<ContactMessageDTO> sendMessage(ContactMessageDTO request) {

        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setMessage(request.getMessage());
        contactMessage.setEmail(request.getEmail());
        contactMessage.setFirstName(request.getFirstName());
        contactMessage.setLastName(request.getLastName());
        contactMessage.setSubject(request.getSubject());
        contactMessage.setPhoneNumber(request.getPhoneNumber());
        contactMessage.setCreatedAt(LocalDateTime.now());

        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);

        ContactMessageDTO returnedMessage =
                modelMapper.map(savedMessage,ContactMessageDTO.class);

        return ResponseDTO.<ContactMessageDTO>builder()
                .message("Message saved successfully")
                .statusCode(HttpStatus.OK.value())
                .data(returnedMessage)
                .build();
    }
}


















