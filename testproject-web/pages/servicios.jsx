import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import clienteService from "../services/cliente.Service";
import servicioService from "../services/servicio.Service";
import productoService from "../services/producto.Service";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import DataGrid from "../components/common/DataGrid";
import DataGridCheckBox from "../components/common/DataGridCheckBox"
import swal from 'sweetalert';
import moment from "moment";

const Servicios = () => {
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const [cliente, setCliente] = useState({});
    const [servicios, setServicios] = useState({});
    const [productos, setProductos] = useState({});    
  
    const clienteSchema = Yup.object().shape({      
        cedula: Yup.string()
    });

    const onSubmit = async () => {        
        try {      
            let serviciosApl = servicios.map((item) => {
                let productoSel = productos.find(p => p.productoId === item.productoId);
                return {
                    servicioId: item.servicioId,
                    clienteId: item.clienteId,
                    producto: productoSel,
                    aplicado: item.aplicado
                }
            }); 
                      
            const response = await servicioService.setServiciosPorCliente(serviciosApl); 
            
            if (response) {                
                swal({
                    title: t('servicios:alertTitle').replace("[OPERATION]", t('common:msgInsertedTitle')),                    
                    text: t('servicios:alertText').replace("[OPERATION]", t('common:msgInsertedText')),
                    icon: "success",
                    timer: 1400,
                    buttons: false
                }).then(() => {
                    buscar();
                });
            }
        }
        catch (error) {

        }
    }

    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
        resolver: yupResolver(clienteSchema)
    });

    const getClientePorCedula = async () => {
        try {
            setError(false); 
            const response = null;
            let cedula = getValues("cedula");
            if(cedula) {
              response = await clienteService.getClientePorCedula(cedula);
            }                                                                                    
            return response;
        }
        catch (error) {
            setError(true); 
        }
    }

    const getServicios = async (id) => {
        try {
            setError(false); 
            const response = await servicioService.getServiciosPorCliente(id);    
            debugger                     
            return response;
        }
        catch (error) {
            setError(true); 
        }
    }

    const getProductos = async (edad, residencia, ingreso) => {
        try {
            setError(false); 
            debugger
            const response = await productoService.getProductosByCondicion(edad, residencia, ingreso);   
            debugger                                            
            return response;
        }
        catch (error) {
            setError(true); 
        }
    }

    const fetchData = async () => {
        return Promise.all([                    
            getClientePorCedula()            
        ]).then(([ dataCliente ]) => { 
            return { dataCliente };
        });
    }

    const aplicarServicio = async (rowIndex, columnName, value) => {       
        setServicios(old =>
            old.map((row, index) => {
              if (index === rowIndex) {                
                return {
                  ...old[rowIndex],
                  [columnName]: value,
                }
              }
              return row
            })
        );        
    }

    const resumenServicios = async (servicios, productos, parameters) => {
        let allServicios = [];
        let allProductos = [];
        if(servicios) {
            allServicios = servicios.map((item) => {
                return {
                    servicioId: item.servicioId,
                    clienteId: item.clienteId,
                    productoId: item.producto.productoId,
                    codigoProducto: item.producto.codigo,
                    nombreProducto: item.producto.nombre,
                    aplicado: true
                }
            }); 
        }

        if(productos) {
            allProductos = productos.map((item) => {            
                return {
                    servicioId: 0,
                    clienteId: parameters.id,
                    productoId: item.productoId,
                    codigoProducto: item.codigo,
                    nombreProducto: item.nombre,
                    aplicado: false
                }
            });            
        }

        let productosDisponibles = allProductos.filter(el => {            
            return !allServicios.find(element => {
                return element.productoId === el.productoId;
            });
        });       
        
        let resumenServicios = allServicios.concat(productosDisponibles).sort((a, b) => (a.codigoProducto.toUpperCase() > b.codigoProducto.toUpperCase()) ? 1 : -1);
        if(resumenServicios) {
            resumenServicios.map((item, index) => {
                item.aplicar = <DataGridCheckBox key={index} value={item.aplicado} columnName={"aplicado"} rowIndex={index} updateMyData={ aplicarServicio }  ></DataGridCheckBox>
            });
        }
        setServicios({});
        setServicios(resumenServicios);
    }

    const fetchServicios = async(parameters) => {
        return Promise.all([
            getServicios(parameters.id),
            getProductos(parameters.edad, parameters.residencia, parameters.ingreso)
        ]).then(([ dataServicios, dataProductos ]) => {
            return { dataServicios, dataProductos };
        })
    }

    const buscar = async() => {
        fetchData().then(data => {
            if(data.dataCliente) {
                setCliente(data.dataCliente);                                       
                
                let parameters =  {
                    id: data.dataCliente.clienteId,
                    edad: parseInt(moment(data.dataCliente.fechaNacimiento, "YYYY-MM-DD").month(0).from(moment().month(0)).split(" ")[0]),
                    residencia: data.dataCliente.pais.paisId,
                    ingreso: data.dataCliente.ingreso
                }            
                fetchServicios(parameters).then(data => {   
                    setProductos(data.dataProductos);
                    resumenServicios(data.dataServicios, data.dataProductos, parameters);            
                });
            } else {
                setCliente({});
                setServicios({});
            }                 
        });
    }

    useEffect(() => {
        
    }, []);

    return(
        <>
            <br></br>
            <br></br>
            <br></br>
            <Container>
                <Form>
                    <title>{t('servicios:title')}</title>
                    <Row>
                        <Col>
                            <Form.Group>         
                                <h6>{t('servicios:infCliente')}</h6>                       
                                <hr style={{ borderColor: "black" }} ></hr>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br></br> 
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control name="clienteId" defaultValue={0} hidden type="text">
                                </Form.Control>
                                <Form.Label htmlFor="cedula">{t('servicios:cedula')}</Form.Label>
                                <Form.Control name="cedula" ref={register} type="text" placeholder={t('servicios:cedula')}>
                                </Form.Control>                          
                            </Form.Group>                     
                        </Col>
                        <Col>
                            <Form.Group>                             
                                <Form.Label htmlFor="pais">{t('servicios:pais')}</Form.Label>
                                <Form.Control name="pais" defaultValue={ cliente.pais ? cliente.pais.nombre : null } type="text"  readOnly={true}>
                                </Form.Control>                          
                            </Form.Group>                                                   
                        </Col> 
                        <Col>
                            <Form.Group>                                                                              
                                <Form.Label htmlFor="ingreso">{t('servicios:ingreso')}</Form.Label>
                                <Form.Control name="ingreso" defaultValue={ cliente.ingreso } type="text" readOnly={true}>
                                </Form.Control>                
                            </Form.Group>                                                    
                        </Col>         
                    </Row> 
                    <Row>
                        <Col>
                            <Form.Label htmlFor="nombre">{t('servicios:nombre')}</Form.Label>
                            <Form.Control name="nombre" defaultValue={cliente.nombre} type="text" readOnly={true} >
                            </Form.Control>  
                        </Col> 
                        <Col>
                            <Form.Label htmlFor="apellidoPaterno">{t('servicios:apellidoPaterno')}</Form.Label>
                            <Form.Control name="apellidoPaterno" defaultValue={cliente.apellidoPaterno} type="text" readOnly={true} >
                            </Form.Control>  
                        </Col> 
                        <Col>
                            <Form.Label htmlFor="apellidoMaterno">{t('servicios:apellidoMaterno')}</Form.Label>
                            <Form.Control name="apellidoMaterno" defaultValue={cliente.apellidoMaterno} type="text" readOnly={true} >
                            </Form.Control>  
                        </Col>  
                    </Row>
                    <br></br>
                    <Row>          
                        <Col>
                        </Col>            
                        <Col  md="auto">
                            <Button variant="primary" onClick={ buscar }>
                                    { t('common:search')}
                            </Button>  
                        </Col>
                    </Row>
                    {
                        servicios.length > 0 ? 
                        <>
                            <Row>
                                <Col>
                                    <Form.Group>         
                                        <h6>{t('servicios:servicios')}</h6>                       
                                        <hr style={{ borderColor: "black" }} ></hr>
                                    </Form.Group>
                                </Col>
                            </Row> 
                            <Row>
                                <Col>
                                    <DataGrid data={servicios} schemaColumns="servicios" hiddenColumns={ [ "servicioId", "clienteId", "productoId", "aplicado"] } />
                                </Col>
                            </Row>  
                            <Row>
                                <Col>
                                </Col>
                                <Col md="auto">
                                    <Button variant="success" disabled={formState.isSubmitting} onClick={handleSubmit(onSubmit)}>
                                        { t('common:btnSave') }
                                    </Button>
                                </Col>
                            </Row>  
                        </> : null
                    }      
                </Form>
            </Container>
        </>
    )
}

export default Servicios;