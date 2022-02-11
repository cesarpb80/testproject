package com.testproject.app.servicio.service;

import java.util.List;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;

public interface ProductoService {
	
	public List<Producto> getProductos();
	public Producto getProducto(Long productoId);
	public Producto insertProducto(Producto producto);
	public Producto updateProducto(Producto producto);
	public Producto deleteProducto(Long productoId);
	public List<Producto> findByCategoria(Categoria categoria);	
	public List<Producto> findByCondicion(int edad, int residencia, double ingreso);

}
