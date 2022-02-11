package com.testproject.app.cliente.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testproject.app.cliente.entity.Pais;
import com.testproject.app.cliente.service.PaisService;

@RestController
@RequestMapping(path = "/paises")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaisController {
	@Autowired
	private PaisService paisService;
	
	@GetMapping
	public ResponseEntity<List<Pais>> getPaises() {
		
		List<Pais> paises = paisService.getPaises();
		if(paises.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(paises);
		}
				
	}
}
