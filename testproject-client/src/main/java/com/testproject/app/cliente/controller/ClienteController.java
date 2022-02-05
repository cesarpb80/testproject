package com.testproject.app.cliente.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.testproject.app.cliente.entity.Cliente;
import com.testproject.app.cliente.service.ClienteService;

@RestController
@RequestMapping(path = "/clientes")
public class ClienteController {
	
	@Autowired
	private ClienteService clienteService;
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<Cliente> getCliente(@PathVariable Long id) {
		Cliente cliente = clienteService.getCliente(id);	
		
		if(cliente == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(cliente);
		}		
		
	}
	
	@GetMapping(path = "/findbycedula")
	public ResponseEntity<Cliente> getCliente(@RequestParam(name = "cedula", required = true) String cedula) {
		Cliente cliente = clienteService.getCliente(cedula);
		
		if(cliente == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(cliente);
		}		
		 
	}
	
	@GetMapping(path = "/findbyapellido")
	public ResponseEntity<List<Cliente>> getClientes(@RequestParam(name = "paterno", required = false) String paterno, @RequestParam(name = "materno", required = false) String materno) {
		List<Cliente> clientes = clienteService.getClientes(paterno, materno);
		
		if(clientes.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(clientes);
		}				
	}
	
	@GetMapping
	public ResponseEntity<List<Cliente>> getClientes() {
		
		List<Cliente> clientes = clienteService.getClientes();
		
		if(clientes.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(clientes);
		}
		
	}
	
	@PostMapping
	public ResponseEntity<Cliente> insertCliente(@Valid @RequestBody Cliente cliente) {
		Cliente clienteNew = clienteService.insertCliente(cliente);
		
		if(clienteNew == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).body(clienteNew);		
	}
	
	@PutMapping
	public ResponseEntity<Cliente> updateCliente(@Valid @RequestBody Cliente cliente) {
		Cliente clienteUpdate = clienteService.updateCliente(cliente);
		
		if(clienteUpdate == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(clienteUpdate);
	}
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Cliente> deleteCliente(@PathVariable Long id) {
		Cliente clienteDelete = clienteService.deleteCliente(id);
		
		if(clienteDelete == null) {
			ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(clienteDelete);
	}
	
	
}
