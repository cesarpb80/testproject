package com.testproject.app.servicio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.app.servicio.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
