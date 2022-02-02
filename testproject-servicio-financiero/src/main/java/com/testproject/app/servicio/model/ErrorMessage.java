package com.testproject.app.servicio.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor @Builder 
public class ErrorMessage {
	private Date timeStam;	
	private List<Map<String, String>> message;
}
