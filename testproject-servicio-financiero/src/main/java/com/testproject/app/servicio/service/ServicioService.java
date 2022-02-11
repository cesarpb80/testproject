package com.testproject.app.servicio.service;

import java.util.List;

import com.testproject.app.servicio.entity.Servicio;

public interface ServicioService {
	List<Servicio> findByClienteId(Long id);
	Servicio getServicioById(Long id);
	Servicio insertServicio(Servicio servicio);
	Servicio updateServicio(Servicio servicio);
	Servicio deleteServicio(Long id);
}
