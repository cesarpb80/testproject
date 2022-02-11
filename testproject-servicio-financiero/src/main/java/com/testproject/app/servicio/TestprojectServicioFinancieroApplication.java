package com.testproject.app.servicio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients(basePackages = { "com.testproject.app.servicio.client" })
@EnableJpaRepositories("com.testproject.app.servicio.repository")
@EntityScan("com.testproject.app.servicio.entity")
@ComponentScan({"com.testproject.app.servicio.controller", "com.testproject.app.servicio.service", "com.testproject.app.servicio.client"})
public class TestprojectServicioFinancieroApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestprojectServicioFinancieroApplication.class, args);
	}

}
