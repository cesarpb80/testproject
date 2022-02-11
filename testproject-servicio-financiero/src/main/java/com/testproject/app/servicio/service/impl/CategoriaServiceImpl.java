package com.testproject.app.servicio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.repository.CategoriaRepository;
import com.testproject.app.servicio.service.CategoriaService;

@Service
public class CategoriaServiceImpl implements CategoriaService {
	
	@Autowired
	private CategoriaRepository categoriaRepository;

	@Override
	public List<Categoria> getCategorias() {
		return categoriaRepository.findAll();
	}

}
