package com.testproject.app.servicio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.service.CategoriaService;

@RestController
@RequestMapping(path = "/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
	
	@Autowired
	private CategoriaService categoriaService;
	
	@GetMapping
	public ResponseEntity<List<Categoria>> getCategorias() {
		List<Categoria> categorias = categoriaService.getCategorias();
		
		if(categorias.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(categorias);
		}		
	}
}
