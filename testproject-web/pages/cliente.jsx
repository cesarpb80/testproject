import { Form, Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

const Cliente = () => {
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
                    <title>{t('cliente:title')}</title>
                    <Row>
                        <Col>
                            <h3>{t('cliente:title')}</h3>
                        </Col>
                    </Row>
                    <br></br>                   
                </Form>
            </Container>
        </>
    )

}

export default Cliente;