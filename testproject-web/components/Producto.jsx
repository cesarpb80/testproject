import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import DropDown from '../components/common/DropDown';
import swal from 'sweetalert';
import productoService from '../services/producto.Service';

const Producto = ({ item, loadData, dataCatalogs }) => {
    
    const addMode = item ? false : true;    
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);  
    const [categorias, setCategorias] = useState({});

    const productoSchema = Yup.object().shape({
        productoId: Yup.mixed().default({ number: 0 }),   
        categoriaId: Yup.string().required(t('productos:valCategoria')),      
        codigo: Yup.string().required(t('common:valRequiredField').replace("[field]", t('productos:codigo'))),
        nombre: Yup.string().required(t('common:valRequiredField').replace("[field]", t('productos:nombre')))       
    });

    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(productoSchema)
    });
    
    const openModal = () => setShow(true);
    const handleClose = () => setShow(false);

    const setProductoSchema = (addMode, item) => {
        if (!addMode) {
            delete item.Update;
            delete item.Delete;            
            for (var field in item) {
                if (item.hasOwnProperty(field)) {
                    setValue(field, item[field]);
                }
            }
        }
    }

    const onSubmit = async (data) => {        
        return addMode ? await insertProducto(data) : await updateProducto(data);
    }

    const insertProducto = async (data) => {
        try {                 
            let selCategoria = categorias.find(i => i.id === parseInt(data.categoriaId));            
            data['categoria'] = { categoriaId: selCategoria.id, nombre: selCategoria.description };                      
            const response = await productoService.insertProducto(data);            
            if (response) {                
                swal({
                    title: t('productos:alertTitle').replace("[OPERATION]", t('common:msgInsertedTitle')),                    
                    text: t('productos:alertText').replace("[OPERATION]", t('common:msgInsertedText')),
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

    const updateProducto = async (data) => {
        try {                          
            let selCategoria = categorias.find(i => i.id === parseInt(data.categoriaId));            
            data['categoria'] = { categoriaId: selCategoria.id, nombre: selCategoria.description };           
            const response = await productoService.updateProducto(data);            
            if (response) {
                swal({
                    title: t('productos:alertTitle').replace("[OPERATION]", t('common:msgUpdatedTitle')),
                    text: t('productos:alertText').replace("[OPERATION]", t('common:msgUpdatedText')),
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
            let { categorias } = dataCatalogs;            
            setCategorias(categorias);
        }
    }, [dataCatalogs]);

    return(
    <>
        <Button onClick={(e) => openModal(e)} variant="success">{ addMode ? t('common:btnAdd'):t('common:btnEdit')} </Button>
        <Modal show={show} onEnter={() => setProductoSchema(addMode, item)} onHide={() => setShow(false)} size="sm" dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        { t('productos:nombre') }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control name="productoId" defaultValue={0} hidden ref={register} type="text">
                                </Form.Control>
                                <Form.Label htmlFor="codigo">{t('productos:codigo')}</Form.Label>
                                <Form.Control name="codigo" ref={register} className={`form-control ${errors.codigo ? 'is-invalid' : ''}`}  type="text" placeholder={t('productos:codigo')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.codigo?.message}</div>
                            </Form.Group>                            
                        </Col>
                    </Row> 
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label htmlFor="nombre">{t('productos:nombre')}</Form.Label>
                                <Form.Control name="nombre" ref={register} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}  type="text" placeholder={t('productos:nombre')}>
                                </Form.Control>
                                <div className="invalid-feedback">{errors.nombre?.message}</div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                {
                                    categorias ?
                                        <>
                                            <DropDown name="categoriaId" register={register} errorsValidation={errors.categoriaId} controlName={'categoriaId'} label={t('productos:categoriaId')} data={categorias} ></DropDown>                                            
                                        </> : null
                                }
                            </Form.Group>
                        </Col> 
                    </Row>                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('common:btnCancel')}
                    </Button>              
                    <Button variant="primary" disabled={formState.isSubmitting} onClick={handleSubmit(onSubmit)}>
                        { addMode ? t('common:btnInsert') : t('common:btnUpdate')}
                    </Button>
                </Modal.Footer>
        </Modal>        
    </>
    );
}

export default Producto;