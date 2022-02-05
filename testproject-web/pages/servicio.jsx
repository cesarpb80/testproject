import { Form, Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from 'react';

const Servicio = () => {
    debugger

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
                    <title>Servicios</title>
                    <Row>
                        <Col>
                            <h3>Servicio</h3>
                        </Col>
                    </Row>
                    <br></br>
                    <h1>Hola Servicio</h1>
                </Form>
            </Container>
        </>
    )
}

export default Servicio;