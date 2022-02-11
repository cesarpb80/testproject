import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import DataGrid from '../components/common/DataGrid';
import productoService from "../services/producto.Service";
import utilities from '../helpers/utilities';
import swal from 'sweetalert';
import Producto from "../components/Producto";
import categoriaService from "../services/categoria.Service";

const Productos = () => {
    const { t } = useTranslation();
    const dataProductos = [ { productoId: null, categoriaId: null, codigo: null, nombre: null, fechaRegistro: null, descripcion: null, categoria: null, Update: null, Delete: null } ];
    const [productos, setProductos] = useState({});
    const [error, setError] = useState(false);
    const [dataCatalogs, setDataCatalogs] = useState({});

    const deleteItem = async(e, id) => {        
        const result = await utilities.deleteConfirm(t);                
        if (result) {                   
            const response  = await productoService.deleteProducto(id);                        
            if (response) {
                swal({
                    title: t('common:msgDeletedTitle'),
                    text: t('common:msgDeletedText'),
                    icon: "success",
                    timer: 1400,
                    buttons: false,
                }).then(() => {
                    loadData();
                });
            }
        }

    }

    const getProductos = async () => {
        try {
            setError(false);                         
            const response = await productoService.getProductos();                          
            dataProductos = response.map((item) => {
                return {
                    productoId: item.productoId, 
                    categoriaId: item.categoria.categoriaId,
                    codigo: item.codigo,                   
                    nombre: item.nombre, 
                    categoria: item.categoria.nombre,
                    fechaRegistro: item.fechaRegistro                   
                }
            });                       
            return dataProductos;
        }
        catch (error) {
            setError(true); 
        }
    }

    const getCategorias = async () => {
        try {
            setError(false);                         
            const response = await categoriaService.getCategorias();   
            let categorias = response.map((item) => {
                return {
                    id: item.categoriaId,
                    description: item.nombre
                }
            });      
            categorias.unshift({id: null, description: ""});                         
            return categorias;
        }
        catch (error) {
            setError(true); 
        }
    }

    const fetchData = async () => {     
        return Promise.all([                    
            getProductos(),
            getCategorias()                            
        ]).then(([ dataProductos, dataCategorias ]) => { 
            if(dataProductos) {
                dataProductos = dataProductos.sort((a, b) => (a.codigo.toUpperCase() > b.codigo.toUpperCase()) ? 1 : -1) 
            }
            if(dataCategorias) {
                dataCategorias = dataCategorias.sort((a, b) => (a.description.toUpperCase() > b.description.toUpperCase()) ? 1 : -1)
            }
            return { dataProductos, dataCategorias };
        });
    }

    const loadData = async() => {
        
        fetchData().then(data => {            

            let dataCatalogs = {};

            if(data.dataCategorias) {
                dataCatalogs = {
                    categorias: data.dataCategorias
                }                
                setDataCatalogs(dataCatalogs);
            } 
            //debugger
            if(data.dataProductos) {                
                data.dataProductos.map(item => {                    
                    item.Update = <Producto key={item.productoId} item={ item } data={ data.dataProductos } loadData ={ loadData } dataCatalogs= {dataCatalogs}  ></Producto>
                    item.Delete = <Button onClick={(e) => deleteItem(e, item.productoId)} variant="danger">{t('common:btnDelete')}</Button> 
                });                 
            }            
            setProductos(data.dataProductos ? data.dataProductos : dataProductos);
        });

    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <>
            <br></br>
            <br></br>
            <br></br>
            <Container>
                <Form>
                    <title>{t('productos:title')}</title>
                    <Row>
                        <Col>
                            <h3>{t('productos:title')}</h3>
                        </Col>
                    </Row>
                    <br></br>
                    {/* <h1>Hola mumundo</h1> */}
                    <Row>
                        <Col>
                        </Col>
                        <Col md="auto">
                            <Producto loadData ={ loadData } dataCatalogs= {dataCatalogs} ></Producto>
                        </Col>
                    </Row>
                    <br></br>  
                    <Row>
                        <Col>
                            <DataGrid data={productos} schemaColumns="productos" hiddenColumns={ ["productoId", "fechaRegistro", "categoriaId"] } />
                        </Col>
                    </Row>                   
                </Form>
            </Container>
        </>
    )

}

export default Productos;