package com.example.doctor.appointment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DoctorAppointmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoctorAppointmentApplication.class, args);
	}

}
