package com.testproject.app.cliente.service.impl;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testproject.app.cliente.entity.Cliente;
import com.testproject.app.cliente.repository.ClienteRepository;
import com.testproject.app.cliente.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	
	public static final Logger LOGGER = Logger.getLogger(ClienteServiceImpl.class.getName());;

	@Override
	public List<Cliente> getClientes() {	
		return clienteRepository.findAll();
	}

	@Override
	public Cliente getCliente(Long id) {	
		LOGGER.info("getCliente: " + id);		
		return clienteRepository.findById(id).orElse(null);
	}

	@Override
	public Cliente insertCliente(Cliente cliente) {				
		Cliente clienteExitst = getCliente(cliente.getCedula());
		
		if(clienteExitst == null) {
			clienteRepository.save(cliente);
		} else {
			cliente = clienteExitst;
		}
		
		return cliente;
	}

	@Override
	public Cliente updateCliente(Cliente cliente) {		
		
		Cliente clienteUpdate = getCliente(cliente.getClienteId());
		if(clienteUpdate != null) {
			clienteUpdate.setCedula(cliente.getCedula());
			clienteUpdate.setNombre(cliente.getNombre());
			clienteUpdate.setApellidoPaterno(cliente.getApellidoPaterno());
			clienteUpdate.setApellidoMaterno(cliente.getApellidoMaterno());
			clienteUpdate.setSexo(cliente.getSexo());
			clienteUpdate.setFechaNacimiento(cliente.getFechaNacimiento());
			clienteUpdate.setIngreso(cliente.getIngreso());
			clienteUpdate.setPais(cliente.getPais());
			clienteUpdate.setDireccion(cliente.getDireccion());
		} else {
			return null;
		}
		
		return clienteRepository.save(clienteUpdate);
	}

	@Override
	public Cliente deleteCliente(Long id) {		
		Cliente clienteDelete = getCliente(id);
		if(clienteDelete != null) {
			clienteRepository.delete(clienteDelete);
			return clienteDelete;
		} else {
			return null;
		}
		
	}

	@Override
	public Cliente getCliente(String cedula) {		
		return clienteRepository.findByCedula(cedula);
	}

	@Override
	public List<Cliente> getClientes(String apellidoPaterno, String apellidoMaterno) {		
		return clienteRepository.findByApellidoPaternoAndApellidoMaterno(apellidoPaterno, apellidoMaterno);
	}

}
