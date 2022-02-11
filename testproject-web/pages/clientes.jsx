import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import clienteService from '../services/cliente.Service';
import DataGrid from '../components/common/DataGrid';
import Cliente from '../components/Cliente';
import utilities from '../helpers/utilities';
import swal from 'sweetalert';
import paisService from "../services/pais.Service";

const Clientes = () => {
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const [clientes, setClientes] = useState({});
    const [dataCatalogs, setDataCatalogs] = useState({});
    const dataClientes = [ { clienteId: null, paisId: null, cedula: null, nombre: null, apellidoPaterno: null, apellidoMaterno: null, sexo: null, fechaNacimiento: null, pais: null, direccion: null, ingresos: null, Update: null, Delete: null } ];

    const deleteItem = async(e, id) => {        
        const result = await utilities.deleteConfirm(t);                
        if (result) {                   
            const response  = await clienteService.deleteCliente(id);            
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

    const getClientes = async () => {
        try {
            setError(false);                         
            const response = await clienteService.getClientes(); 
            dataClientes = response.map((item) => {
                return {
                    clienteId: item.clienteId, 
                    paisId: item.pais.paisId,
                    cedula: item.cedula,                   
                    nombre: item.nombre, 
                    apellidoPaterno: item.apellidoPaterno,
                    apellidoMaterno: item.apellidoMaterno,
                    sexo: item.sexo,
                    fechaNacimiento: item.fechaNacimiento,
                    ingreso: item.ingreso,
                    pais: item.pais.nombre,
                    direccion: item.direccion                    
                }
            });                       
            return dataClientes;                                   
        }
        catch (error) {
            setError(true); 
        }
    }

    const getPaises = async () => {
        try {
            setError(false);                                     
            const response = await paisService.getPaises();               
            let paises = response.map((item) => {
                return {
                    id: item.paisId,
                    description: item.nombre
                }
            });      
            paises.unshift({id: null, description: ""});                         
            return paises;
        }
        catch (error) {
            setError(true); 
        }
    }

    const fetchData = async () => {     
        return Promise.all([                    
            getClientes(),
            getPaises()                           
        ]).then(([ dataClientes, dataPaises ]) => { 
            if(dataClientes) {
                dataClientes = dataClientes.sort((a, b) => (a.cedula.toUpperCase() > b.cedula.toUpperCase()) ? 1 : -1) 
            }
            if(dataPaises) {
                dataPaises = dataPaises.sort((a, b) => (a.description.toUpperCase() > b.description.toUpperCase()) ? 1 : -1)
            }
            return { dataClientes, dataPaises };
        });
    }

    const loadData = async() => {

        fetchData().then(data => {
            let dataCatalogs = {};
            
            if(data.dataPaises) {

                dataCatalogs = {
                    paises: data.dataPaises
                }                
                setDataCatalogs(dataCatalogs);
            } 

            if(data.dataClientes) {
                data.dataClientes.map(item => {
                    item.Update = <Cliente key={item.clienteid} item={ item } data={ data.dataClientes } loadData ={ loadData } dataCatalogs={ dataCatalogs } ></Cliente>
                    item.Delete = <Button onClick={(e) => deleteItem(e, item.clienteId)} variant="danger">{t('common:btnDelete')}</Button> 
                });                 
            }   
                   
            setClientes(data.dataClientes ? data.dataClientes : dataClientes);
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
                    <title>{t('clientes:title')}</title>
                    <Row>
                        <Col>
                            <h3>{t('clientes:title')}</h3>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                        </Col>
                        <Col md="auto">
                            <Cliente loadData ={ loadData } dataCatalogs={ dataCatalogs } ></Cliente>
                        </Col>
                    </Row>
                    <br></br>  
                    <Row>
                        <Col>
                            <DataGrid data={clientes} schemaColumns="clientes" hiddenColumns={ ["clienteId", "paisId"] } />
                        </Col>
                    </Row>                 
                </Form>
            </Container>
        </>
    )

}

export default Clientes;