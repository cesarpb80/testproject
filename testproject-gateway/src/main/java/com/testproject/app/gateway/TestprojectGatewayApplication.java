package com.testproject.app.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TestprojectGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestprojectGatewayApplication.class, args);
	}

}
