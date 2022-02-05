import Head from 'next/head'
import React, { useEffect } from 'react';

const Home = () => {
    const { t, lang } = useTranslation();

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
                    <title>Index</title>
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

export default Home;