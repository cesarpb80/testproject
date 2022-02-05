package com.testproject.app.cliente.service;

import java.util.List;

import com.testproject.app.cliente.entity.Cliente;

public interface ClienteService {
	public List<Cliente> getClientes();
	public Cliente getCliente(Long id);
	public Cliente getCliente(String cedula);
	public Cliente insertCliente(Cliente cliente);
	public Cliente updateCliente(Cliente cliente);
	public Cliente deleteCliente(Long id);	
	public List<Cliente> getClientes(String apellidoPaterno, String apellidoMaterno);
}
