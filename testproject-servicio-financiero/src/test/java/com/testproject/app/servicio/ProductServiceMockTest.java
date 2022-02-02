package com.testproject.app.servicio;

import java.util.Date;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;
import com.testproject.app.servicio.repository.ProductoRepository;
import com.testproject.app.servicio.service.ProductoService;
import com.testproject.app.servicio.service.impl.ProductoServiceImpl;

@SpringBootTest
public class ProductServiceMockTest {
	
	@Mock
	private ProductoRepository productoRepository;
		
	private ProductoService productoService;
	
	@BeforeEach
	public void setup() {
		 MockitoAnnotations.initMocks(this);
		 productoService = new ProductoServiceImpl(productoRepository);
		 Producto cuenta = Producto.builder()
				 .productoId(1L)
				 .nombre("Cuentas")
				 .codigo("0001")
				 .fechaRegistro(new Date())
				 .categoria(Categoria.builder().categoriaId(1L).nombre("Ahorro").build())
				 .build();
		 
		 //Test obtener producto por Id
		 Mockito.when(productoRepository.findById(1L)).thenReturn(Optional.of(cuenta));
		 //Test update producto
		 Mockito.when(productoRepository.save(cuenta)).thenReturn(cuenta);
	}
	
	@Test
	public void whenValidFindById_thenReturnProducto() {
		Producto producto = productoService.getProducto(1L);
		Assertions.assertThat(producto.getNombre()).isEqualTo("Cuentas");		
	}
	
	@Test
	public void whenValidUpdate_ThenReturnUpdateProducto() {
		Producto producto = Producto.builder()
				.productoId(1L)
				.nombre("Tarjeta debito")
				.codigo("0002")
				.fechaRegistro(new Date())
				.categoria(Categoria.builder().categoriaId(3L).nombre("Financiación").build())
				.build();
		
		Producto productoUpdate = productoService.updateProducto(producto);
		Assertions.assertThat(productoUpdate.getCodigo()).isEqualTo("0002");
	}

}
