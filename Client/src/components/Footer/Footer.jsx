import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Footer = () => {
    return (
        <Container>
            <Row>
                <Col >
                    Aca va el logo
                </Col>
                <Col>
                    <h4>Información</h4>
                    <a href="/nosotros"/>
                    <p>Nosotros</p>
                    <a href="/faq"/>
                    <p>FAQ</p>
                </Col>
                <Col>
                <h4>Legal</h4>
                    <a href="/terminosYCondiciones"/>
                    <p>Términos y Condiciones</p>
                    <a href="/politicaDePrivacidad"/>
                    <p>Política de Privacidad</p>
                </Col>
            </Row>
            <div>
               <p>2023 - Wizarding Wares | All rights reserved</p>
            </div>
        </Container>
    )
}

export default Footer;