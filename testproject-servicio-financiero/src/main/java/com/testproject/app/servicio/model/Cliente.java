package com.testproject.app.servicio.model;

import java.util.Date;

import lombok.Data;

@Data
public class Cliente {

	private Long clienteId;
	private String cedula;
	private String nombre;
	private String apellidoPaterno;
	private String apellidoMaterno;
	private String sexo;
	private Date fechaNacimiento;
	private Double ingreso;
	private String direccion;
	private Pais pais;

}
