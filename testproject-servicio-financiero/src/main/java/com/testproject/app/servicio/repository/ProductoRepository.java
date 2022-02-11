package com.testproject.app.servicio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

	public List<Producto> findByCategoria(Categoria categoria);
		
	String strQuery = "SELECT P.PRODUCTO_ID, P.CODIGO, P.FECHA_REGISTRO, P.DESCRIPCION, P.CATEGORIA_ID FROM PRODUCTO P INNER JOIN CONDICION C ON P.PRODUCTO_ID = C.PRODUCTO_ID "
			+ "WHERE (:residencia = C.VALOR) OR (:edad >= C.VALOR AND :residencia = C.VALOR) OR (:edad >= C.VALOR AND :ingreso >= C.VALOR) OR (:residencia = C.VALOR AND :edad >= C.VALOR AND :ingreso >= C.VALOR) "
			+ "GROUP BY P.PRODUCTO_ID, P.CODIGO, P.FECHA_REGISTRO, P.DESCRIPCION, P.CATEGORIA_ID";
	
	@Query(value= strQuery, nativeQuery=true)
	public List<Producto> findByCondicion(int edad, int residencia, double ingreso);
}
