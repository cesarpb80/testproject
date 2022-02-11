package com.testproject.app.servicio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testproject.app.servicio.entity.Servicio;
import com.testproject.app.servicio.service.ServicioService;

@RestController
@RequestMapping (path = "/servicios")
@CrossOrigin(origins = "*")
public class ServicioController {

	@Autowired
	private ServicioService servicioService;
	
	@GetMapping (path = "/{id}")
	public ResponseEntity<List<Servicio>> findByClienteId(@PathVariable Long id) {
		List<Servicio> servicios = servicioService.findByClienteId(id);
		
		if(servicios.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(servicios);
		}
		
	}
	
	@PostMapping
	public ResponseEntity<Boolean> setServiciosByCliente(@RequestBody List<Servicio> servicios) {
				
		Boolean success = false;
		try {
			servicios.forEach(s -> {				
				if(s.getServicioId() == 0 && s.getAplicado()) {
					servicioService.insertServicio(s);
				} else if (s.getServicioId() != 0 && !s.getAplicado()) {
					servicioService.deleteServicio(s.getServicioId());
				}
				
		    });
			success = true;			
		}catch (Exception e) {
			throw e;
		}
		
		return ResponseEntity.ok(success);		
	}
}
