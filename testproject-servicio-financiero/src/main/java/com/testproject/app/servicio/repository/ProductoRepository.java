package com.testproject.app.servicio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {	
	public List<Producto> findByCategoria(Categoria categoria);
}
