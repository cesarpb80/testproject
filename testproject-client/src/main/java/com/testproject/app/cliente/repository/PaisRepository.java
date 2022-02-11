package com.testproject.app.cliente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.app.cliente.entity.Pais;

public interface PaisRepository extends JpaRepository<Pais, Long> {

}
