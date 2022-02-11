package com.testproject.app.servicio.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testproject.app.servicio.client.ClienteClient;
import com.testproject.app.servicio.entity.Servicio;
import com.testproject.app.servicio.model.Cliente;
import com.testproject.app.servicio.repository.ServicioRepository;
import com.testproject.app.servicio.service.ServicioService;

@Service
public class ServiciosServiceImpl implements ServicioService {
	
	@Autowired
	private ServicioRepository servicioRepository;
	
	@Autowired
	private ClienteClient clienteClient;

	@Override
	public List<Servicio> findByClienteId(Long id) {
		return servicioRepository.findByClienteId(id);
	}

	@Override
	public Servicio insertServicio(Servicio servicio) {
		Cliente cliente = clienteClient.getCliente(servicio.getClienteId());
		servicio.setFechaRegistro(new Date());	
		servicio.setCliente(cliente);
		servicioRepository.save(servicio);		
		return servicio;
	}

	@Override
	public Servicio updateServicio(Servicio servicio) {
		Servicio servicioUpdate = getServicioById(servicio.getServicioId());
		
		if(servicioUpdate != null) {			
			servicioUpdate.setClienteId(servicio.getClienteId());
			return servicioRepository.save(servicioUpdate);
		} else { 
			return null;
		}
	}

	@Override
	public Servicio deleteServicio(Long id) {
		Servicio servicioDelete = getServicioById(id);
		if(servicioDelete != null) {
			servicioRepository.delete(servicioDelete);
			return servicioDelete;
		} else {
			return null;
		}
		
	}

	@Override
	public Servicio getServicioById(Long id) {
		return servicioRepository.getById(id);
	}
}
