package com.testproject.app.servicio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.testproject.app.servicio.entity.Categoria;
import com.testproject.app.servicio.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
	String strQuery = "SELECT P.* FROM PRODUCTO P INNER JOIN CONDICION C ON P.PRODUCTO_ID = C.PRODUCTO_ID "
			+ "WHERE :edad >= (SELECT C1.VALOR FROM CONDICION C1 WHERE C1.CONDICION_TIPO_ID = 1 AND C1.CONDICION_ID = C.CONDICION_ID) AND "
			+ "(:edad >= (SELECT C1.VALOR FROM CONDICION C1 WHERE C1.CONDICION_TIPO_ID = 1 AND C1.CONDICION_ID = C.CONDICION_ID) OR " 
			+ ":ingreso >= (SELECT C2.VALOR FROM CONDICION C2 WHERE C2.CONDICION_TIPO_ID = 2 AND C2.CONDICION_ID = C.CONDICION_ID)) OR "
			+ ":residencia = (SELECT C3.VALOR FROM CONDICION C3 WHERE C3.CONDICION_TIPO_ID = 3 AND C3.CONDICION_ID = C.CONDICION_ID)";
	public List<Producto> findByCategoria(Categoria categoria);
	//"SELECT P.* FROM PRODUCTO P INNER JOIN CONDICION C ON P.PRODUCTO_ID = C.PRODUCTO_ID WHERE :edad >= C.VALOR OR (:ingreso >= C.VALOR AND :edad >= C.VALOR) OR :residencia = C.VALOR"
	@Query(value= strQuery, nativeQuery=true)
	public List<Producto> findByCondicion(int edad, int residencia, double ingreso);
}
