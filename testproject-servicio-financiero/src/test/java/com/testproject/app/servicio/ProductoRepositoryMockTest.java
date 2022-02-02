package com.testproject.app.servicio;

import java.util.Date;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;
import com.testproject.app.servicio.repository.ProductoRepository;

@DataJpaTest
public class ProductoRepositoryMockTest {
		
	@Autowired
	private ProductoRepository productoRepository;	
	
	@Test
	public void whenFindByCategoria_thenReturnListProducto() {
		Producto producto1 = Producto.builder()
				.productoId(1L)
				.categoria(Categoria.builder().categoriaId(4L).build())
				.codigo("0006")				
				.nombre("Giros")
				.fechaRegistro(new Date())
				.build();
		productoRepository.save(producto1);
		
		List<Producto> productos = productoRepository.findByCategoria(producto1.getCategoria());	
		Assertions.assertThat(productos.size()).isEqualTo(1);								
	}
	
}
