package com.testproject.app.cliente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableEurekaClient
@EnableJpaRepositories("com.testproject.app.cliente.repository")
@EntityScan("com.testproject.app.cliente.entity")
@ComponentScan({"com.testproject.app.cliente.controller", "com.testproject.app.cliente.service"})
public class TestprojectClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestprojectClientApplication.class, args);
	}


}
