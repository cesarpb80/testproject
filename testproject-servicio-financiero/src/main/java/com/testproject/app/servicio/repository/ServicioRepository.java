package com.testproject.app.servicio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.testproject.app.servicio.entity.Servicio;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {	
	@Query(value="SELECT * FROM SERVICIO S WHERE S.CLIENTE_ID = :id", nativeQuery=true)
	public List<Servicio> findByClienteId(@Param("id") Long id);
}
