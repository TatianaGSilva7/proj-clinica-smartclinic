package com.atividadedesafiadora.smartclinic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SmartclinicApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartclinicApplication.class, args);
	}

	@GetMapping("/home")
	public String endpointTeste() {
		return "Olá mundo!";
	}
}
