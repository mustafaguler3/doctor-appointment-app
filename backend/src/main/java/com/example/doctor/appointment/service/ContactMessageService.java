package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.ContactMessageDTO;
import com.example.doctor.appointment.dto.ResponseDTO;

public interface ContactMessageService {
    ResponseDTO<ContactMessageDTO> sendMessage(ContactMessageDTO request);
}
