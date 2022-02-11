package com.testproject.app.servicio.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.testproject.app.servicio.model.Cliente;

//@FeignClient(name = "cliente-client", url = "http://localhost:8092")
//@FeignClient(value = "cliente-ws")
//@FeignClient(value = "cliente-ws", name = "cliente-ws", url = "http://host.docker.internal:9090/cliente-ws")
@FeignClient(value = "gateway", url = "http://host.docker.internal:9090/cliente-ws")
public interface ClienteClient {
	
	@GetMapping(path = "/clientes/{id}")
	public Cliente getCliente(@PathVariable("id") Long id);
}
