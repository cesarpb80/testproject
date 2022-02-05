import { Form, Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
const Producto = () => {
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
                    <title>{t('producto:title')}</title>
                    <Row>
                        <Col>
                            <h3>{t('producto:title')}</h3>
                        </Col>
                    </Row>
                    <br></br>                   
                </Form>
            </Container>
        </>
    )

}

export default Producto;