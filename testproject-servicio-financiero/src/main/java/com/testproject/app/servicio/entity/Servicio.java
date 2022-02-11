package com.testproject.app.servicio.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.testproject.app.servicio.model.Cliente;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Servicio")
@Data 
@AllArgsConstructor @NoArgsConstructor @Builder 
public class Servicio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long servicioId;
	@NotNull(message = "ClienteId no puede ser vacio")
	private Long clienteId;
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaRegistro;
	
	@NotNull(message = "Producto no puede ser vacio")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productoId")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Producto producto;
	
	@Transient
	private Boolean aplicado;
	
	@Transient
	private Cliente cliente;
}
