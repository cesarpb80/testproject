package com.testproject.app.servicio.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;
import com.testproject.app.servicio.repository.ProductoRepository;
import com.testproject.app.servicio.service.ProductoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor //Constructor por dependencia
public class ProductoServiceImpl implements ProductoService {

	private final ProductoRepository productoRepository;
	
	@Override
	public List<Producto> getProductos() { 
		return productoRepository.findAll();
	}

	@Override
	public Producto getProducto(Long productoId) {
		return productoRepository.findById(productoId).orElse(null);
	}

	@Override
	public Producto insertProducto(Producto producto) {
		producto.setFechaRegistro(new Date());		
		return productoRepository.save(producto);
	}
	
	@Override
	public Producto updateProducto(Producto producto) {
		Producto productoUpdate = getProducto(producto.getProductoId());
		if(productoUpdate != null) {
			productoUpdate.setCodigo(producto.getCodigo());
			productoUpdate.setCategoria(producto.getCategoria());
			productoUpdate.setNombre(producto.getNombre());
			productoUpdate.setFechaRegistro(new Date());
			return productoRepository.save(productoUpdate);
		} else {
			return null;
		}		
	}

	@Override
	public Producto deleteProducto(Long productoId) {
		Producto productoDelete = getProducto(productoId);
		if(productoDelete != null) {		
			productoRepository.delete(productoDelete);
			return productoDelete;
		} else {
			return null;
		}	
	}

	@Override
	public List<Producto> findByCategoria(Categoria categoria) {
		return productoRepository.findByCategoria(categoria);
	}

}
