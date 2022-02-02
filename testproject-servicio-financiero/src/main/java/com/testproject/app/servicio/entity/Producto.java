package com.testproject.app.servicio.entity;

import java.util.Date;

import javax.persistence.Column;
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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Producto")
@Data 
@AllArgsConstructor @NoArgsConstructor @Builder 
public class Producto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productoId;	
	@NotNull(message = "Codigo no puede ser vacio")
	private String codigo;
	@Column(name = "descripcion") 
	@NotEmpty(message = "Nombre no puede ser vacio")
	private String nombre;
	@NotNull(message = "Fecha de registro no puede ser vacio")
	//@Pattern(regexp = "([0-2][0-9]|3[0-1])\\/(0[1-9]|1[0-2])\\/[0-9]{4}", message = "Feha de registro incorrecta")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaRegistro;
	
	@NotNull(message = "Catagoria no puede ser vacia")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "categoriaId")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Categoria categoria;
}
