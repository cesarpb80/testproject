package com.testproject.app.cliente.entity;

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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Cliente")
@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class Cliente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long clienteId;
	@NotNull(message = "Cedula no puede ser vacio")
	@Size( min = 8 , max = 8, message = "El numero de cedula debe contener 8 caracteres")
    @Column(unique = true, length = 8, nullable = false)
	private String cedula;
	@NotNull(message = "Nombre no puede ser vacio")
	private String nombre;
	@NotNull(message = "Apellido Paterno no puede ser vacio")	
	private String apellidoPaterno;
	private String apellidoMaterno;
	private String sexo;
	@NotNull(message = "Fecha nacimiento no puede ser vacio")
	@Temporal(TemporalType.DATE)
	private Date fechaNacimiento;	
	@NotNull(message = "Ingresos no puede ser vacio")
	private Double ingreso;
	private String direccion;
	
	@NotNull(message = "Pais no puede ser vacio")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "paisId")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Pais pais;
	
}
