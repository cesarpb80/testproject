import { Form, Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from 'react';

const Cliente = () => {
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
                    <title>Cliente</title>
                    <Row>
                        <Col>
                            <h3>Cliente</h3>
                        </Col>
                    </Row>
                    <br></br>
                    <h1>Hola Mundo</h1>
                </Form>
            </Container>
        </>
    )

}

export default Cliente;