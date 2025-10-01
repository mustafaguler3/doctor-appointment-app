package com.example.doctor.appointment.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MapperConfig {

    @Bean
    private ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
