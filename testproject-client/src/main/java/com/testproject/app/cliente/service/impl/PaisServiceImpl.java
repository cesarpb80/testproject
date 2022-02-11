package com.testproject.app.cliente.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testproject.app.cliente.entity.Pais;
import com.testproject.app.cliente.repository.PaisRepository;
import com.testproject.app.cliente.service.PaisService;

@Service
public class PaisServiceImpl implements PaisService {

	@Autowired
	private PaisRepository paisRepository;
	@Override
	public List<Pais> getPaises() {
		return paisRepository.findAll();
	}		

}
