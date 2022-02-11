package com.testproject.app.servicio.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Condicion")
@Data 
@AllArgsConstructor @NoArgsConstructor @Builder
public class Condicion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int condicionId;
	private Double valor;

	@NotNull(message = "Condicion tipo no puede ser vacio")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "condicionTipoId")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private CondicionTipo condicionTipo;
	
	@NotNull(message = "Producto no puede ser vacio")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productoId")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Producto producto;
}
