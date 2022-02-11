package com.testproject.app.servicio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.app.servicio.entity.Condicion;

public interface CondicionRepository extends JpaRepository<Condicion, Integer> {

}
