import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Form, Button, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import DropDown from '../components/common/DropDown';
import swal from 'sweetalert';
import moment from 'moment-timezone';
import clienteService from '../services/cliente.Service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Cliente = ({ item, loadData, dataCatalogs }) => {
    
    const addMode = item ? false : true;    
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const [sexo, setSexo] = useState([{ id:'', description: null }, { id:'F', description:'Femenino'}, { id:'M', description:'Masculino' }]);
    const [fechaNacimiento, setFechaNacimiento] = useState(addMode ? null : new Date());   
    const [paises, setPaises] = useState({});
    const INGMIN = 500;

    const clienteSchema = Yup.object().shape({
        clienteId: Yup.mixed().default({ number: 0 }),      
        paisId: Yup.string().required(t('clientes:valPais')),  
        cedula: Yup.string().required(t('common:valRequiredField').replace("[field]", t('clientes:cedula'))),
        nombre: Yup.string().required(t('common:valRequiredField').replace("[field]", t('clientes:nombre'))),
        apellidoPaterno: Yup.string().required(t('common:valRequiredField').replace("[field]", t('clientes:apellidoPaterno'))),
        apellidoMaterno: Yup.string(),
        sexo: Yup.string().required(t('common:valRequiredField').replace("[field]", t('clientes:sexo'))),
        fechaNacimiento: Yup.string().required(t('common:valRequiredField').replace("[field]", t('clientes:fechaNacimiento'))),        
        ingreso: Yup.number().min(INGMIN, t('clientes:valMin').replace("[VALUE]", INGMIN)).typeError(t('clientes:valIngreso').replace("[field]", t('clientes:ingreso'))),
        direccion: Yup.string().required(t('common:valRequiredField').replace("[field]", t('clientes:direccion'))),
    });

    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(clienteSchema)
    });
    
    const openModal = () => setShow(true);
    const handleClose = () => setShow(false);

    const setClientSchema = (addMode, item) => {
        if (!addMode) {
            delete item.Update;
            delete item.Delete;
            for (var field in item) {
                if (item.hasOwnProperty(field)) {
                    switch (field) {
                        case 'fechaNacimiento': {                                                        
                            setFechaNacimiento(new Date(item[field]));                            
                            break;
                        }                     
                    } 
                    setValue(field, item[field]);
                }
            }
        } else {
            let date = new Date();
            setFechaNacimiento(date);            
            setValue("fechaNacimiento", moment(date).format("YYYY-MM-DD"));
        }
    }

    const onSubmit = async (data) => {        
        return addMode ? await insertCliente(data) : await updateCliente(data);
    }

    const insertCliente = async (data) => {
        try {      
            let selPais = paises.find(i => i.id === parseInt(data.paisId));            
            data['pais'] = { paisId: selPais.id, nombre: selPais.description };                 
            const response = await clienteService.insertCliente(data);            
            if (response) {                
                swal({
                    title: t('clientes:alertTitle').replace("[OPERATION]", t('common:msgInsertedTitle')),                    
                    text: t('clientes:alertText').replace("[OPERATION]", t('common:msgInsertedText')),
                    icon: "success",
                    timer: 1400,
                    buttons: false
                }).then(() => {
                    loadData();
                    handleClose();
                });
            }
        }
        catch (error) {

        }
    }

    const updateCliente = async (data) => {
        try {     
            let selPais = paises.find(i => i.id === parseInt(data.paisId));            
            data['pais'] = { paisId: selPais.id, nombre: selPais.description }; 
                  
            const response = await clienteService.updateCliente(data);            
            if (response) {
                swal({
                    title: t('clientes:alertTitle').replace("[OPERATION]", t('common:msgUpdatedTitle')),
                    text: t('clientes:alertText').replace("[OPERATION]", t('common:msgUpdatedText')),
                    icon: "success",
                    timer: 1400,
                    buttons: false
                }).then(() => {
                    loadData();
                    handleClose();
                });
            }
        }
        catch (error) {

        }
    }

    useEffect(() => {        
        if(dataCatalogs) {
            let { paises } = dataCatalogs;            
            setPaises(paises);
        }
    }, [dataCatalogs]);

    return(
        <>
            <Button onClick={(e) => openModal(e)} variant="success">{ addMode ? t('common:btnAdd'):t('common:btnEdit')} </Button>
            <Modal show={show} onEnter={() => setClientSchema(addMode, item)} onHide={() => setShow(false)} size="lg" dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        { t('clientes:frmTitle') }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control name="clienteId" defaultValue={0} hidden ref={register} type="text">
                                </Form.Control>
                                <Form.Label htmlFor="cedula">{t('clientes:cedula')}</Form.Label>
                                <Form.Control name="cedula" ref={register} className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}  type="text" placeholder={t('clientes:cedula')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.cedula?.message}</div>
                            </Form.Group>                            
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="nombre">{t('clientes:nombre')}</Form.Label>
                                <Form.Control name="nombre" ref={register} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}  type="text" placeholder={t('clientes:nombre')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.nombre?.message}</div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="apellidoPaterno">{t('clientes:apellidoPaterno')}</Form.Label>
                                <Form.Control name="apellidoPaterno" ref={register} className={`form-control ${errors.apellidoPaterno ? 'is-invalid' : ''}`}  type="text" placeholder={t('clientes:apellidoPaterno')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.apellidoPaterno?.message}</div>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="apellidoMaterno">{t('clientes:apellidoMaterno')}</Form.Label>
                                <Form.Control name="apellidoMaterno" ref={register} className={`form-control ${errors.apellidoMaterno ? 'is-invalid' : ''}`}  type="text" placeholder={t('clientes:apellidoMaterno')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.apellidoMaterno?.message}</div>
                            </Form.Group>
                        </Col>
                    </Row> 
                    <Row>
                        <Col>
                            <Form.Group>
                                {
                                    sexo ?
                                        <>
                                            <DropDown name="sexo" register={register} errorsValidation={errors.sexo} controlName={'sexo'} label={t('clientes:sexo')} data={sexo} ></DropDown>
                                        </> : null
                                }
                            </Form.Group>
                        </Col>   
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="fechaNacimiento">{t('clientes:fechaNacimiento')}</Form.Label>
                                <Form.Control name="fechaNacimiento" defaultValue={moment(fechaNacimiento).format("YYYY-MM-DD")} hidden ref={register} type="text">
                                </Form.Control>                            
                                <DatePicker name="fechaNacimiento" dateFormat={"yyyy-MM-dd"} selected={fechaNacimiento} onChange={date => { setFechaNacimiento(date); setValue("fechaNacimiento", moment(date).format("YYYY-MM-DD")) }} className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}></DatePicker>
                                <div className="invalid-feedback">{errors.fechaNacimiento?.message}</div>
                            </Form.Group>
                        </Col>  
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="ingreso">{t('clientes:ingreso')}</Form.Label>
                                <Form.Control name="ingreso" ref={register} className={`form-control ${errors.ingreso ? 'is-invalid' : ''}`}  type="text" placeholder={t('clientes:ingreso')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.ingreso?.message}</div>
                            </Form.Group>
                        </Col>  
                        <Col>
                            <Form.Group>
                                {
                                    paises ?
                                        <>
                                            <DropDown name="paisId" register={register} errorsValidation={errors.paisId} controlName={'paisId'} label={t('clientes:paisId')} data={paises} ></DropDown>                                            
                                        </> : null
                                }
                            </Form.Group>
                        </Col> 
                    </Row>
                    <Row>
                    <Col>
                        <Form.Group>
                                <Form.Label htmlFor="direccion">{t('clientes:direccion')}</Form.Label>
                                <Form.Control name="direccion" ref={register} className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}  type="text" placeholder={t('clientes:direccion')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.direccion?.message}</div>
                            </Form.Group>
                        </Col> 
                    </Row>                     
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('common:btnCancel')}
                    </Button>              
                    <Button variant="primary" type="submit" disabled={formState.isSubmitting} onClick={handleSubmit(onSubmit)}>
                        {addMode ? t('common:btnInsert') : t('common:btnUpdate')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Cliente;