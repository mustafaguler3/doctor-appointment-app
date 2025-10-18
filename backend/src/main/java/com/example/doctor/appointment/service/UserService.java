package com.example.doctor.appointment.service;

import com.example.doctor.appointment.dto.UserDTO;

public interface UserService {
    void update(long userId, UserDTO userDto);
}
