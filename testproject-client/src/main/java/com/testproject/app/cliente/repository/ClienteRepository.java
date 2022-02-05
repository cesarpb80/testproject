package com.testproject.app.cliente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.testproject.app.cliente.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {	
	public Cliente findByCedula(String cedula);
	@Query(value="SELECT * FROM CLIENTE C WHERE C.APELLIDO_PATERNO LIKE %:paterno% OR C.APELLIDO_MATERNO LIKE %:materno%", nativeQuery=true)
	public List<Cliente> findByApellidoPaternoAndApellidoMaterno(@Param("paterno") String paterno, @Param("materno") String materno);
}
