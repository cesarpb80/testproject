package com.testproject.app.servicio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;
import com.testproject.app.servicio.service.ProductoService;
import com.testproject.app.servicio.util.FormatErrorException;

@RestController
@RequestMapping(path = "/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
	
	@Autowired
	private ProductoService productoService;
	
	@GetMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Producto> getProducto(@PathVariable Long id) {
		Producto producto = productoService.getProducto(id);
		
		if(producto == null) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(producto);
		}		
	}
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<Producto>> getProductos(@RequestParam(name = "catacoriaId", required = false) Long categoriaId) {
		List<Producto> productos = new ArrayList<>();
		
		if(categoriaId == null) {
			productos = productoService.getProductos();
			if(productos.isEmpty()) {
				return ResponseEntity.noContent().build();
			}
		} else {
			productos = productoService.findByCategoria(Categoria.builder().categoriaId(categoriaId).build());
			if(productos.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
		}
		
		return new ResponseEntity<List<Producto>>(productos, HttpStatus.OK); // return ResponseEntity.ok(productos); Es lo mismo que		
	}
	
	@GetMapping(path = "/productosbycondicion")
	public ResponseEntity<List<Producto>> getProductosByCondicion(@RequestParam(name = "edad", required = true) int edad,
			@RequestParam(name = "residencia", required = true) int residencia, @RequestParam(name = "ingreso", required = true) double ingreso) {
		List<Producto> productos = productoService.findByCondicion(edad, residencia, ingreso);
		
		if(productos.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(productos);
		}
		
	}
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<Producto> insertProducto(@Valid @RequestBody Producto producto, BindingResult result) {
		
		if(result.hasErrors()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FormatErrorException.formatMessage(result));
		}		
		
		Producto productoNew = productoService.insertProducto(producto);
		if(productoNew == null) {
			ResponseEntity.notFound().build();
		}		
		return ResponseEntity.status(HttpStatus.CREATED).body(productoNew);
	}
	
	@PutMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<Producto> updateProducto(@RequestBody Producto producto)
	{
		Producto productoUpdate = productoService.updateProducto(producto);
		
		if(productoUpdate == null) {
			ResponseEntity.notFound().build();
		}	
		
		return new ResponseEntity<Producto>(productoUpdate, HttpStatus.OK);
	}
	
	@DeleteMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Producto> deleteProducto(@PathVariable Long id){
		Producto productoDelete = productoService.deleteProducto(id);
		
		if(productoDelete == null) {
			ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(productoDelete); 
	}

}
