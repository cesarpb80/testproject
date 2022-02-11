package com.testproject.app.servicio.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CondicionTipo")
@Data 
@AllArgsConstructor @NoArgsConstructor @Builder
public class CondicionTipo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer condicionTipoId;
	private String nombre;
}
