import { Form, Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

const Servicio = () => {
    const { t } = useTranslation();

    const loadData = async() => {

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
                    <title>{t('servicio:title')}</title>
                    <Row>
                        <Col>
                            <h3>{t('servicio:title')}</h3>
                        </Col>
                    </Row>
                    <br></br>                    
                </Form>
            </Container>
        </>
    )
}

export default Servicio;