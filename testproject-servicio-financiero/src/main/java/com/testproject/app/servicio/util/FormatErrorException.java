package com.testproject.app.servicio.util;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.validation.BindingResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.testproject.app.servicio.model.ErrorMessage;

public class FormatErrorException {
	
	public static String formatMessage(BindingResult result) {
		
		ObjectMapper mapper = new ObjectMapper();
		String strJson = "";
		
		List<Map<String, String>> errors = result.getFieldErrors().stream()
				.map(err -> {
					Map<String, String> error = new HashMap<>();
					error.put(err.getField(), err.getDefaultMessage());
					return error;
				}).collect(Collectors.toList());
		
		ErrorMessage errorMessage = ErrorMessage.builder().timeStam(new Date()).message(errors).build();
		
		try {
			strJson = mapper.writeValueAsString(errorMessage);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return strJson;
	}
}
