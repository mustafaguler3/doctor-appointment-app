package com.example.doctor.appointment.config;

import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
public class MapperConfig {

    @Bean
    private ModelMapper modelMapper(){
        return new ModelMapper();
    }

}
