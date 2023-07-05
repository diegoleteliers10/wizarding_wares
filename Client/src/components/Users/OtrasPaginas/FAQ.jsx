import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import BackButton from "../BackButton/BackButton";
import '../storeStyles.css';

const Faq = () => {
    return(
        <Container className="mt-8">
          <div>
            <div className="w-full">
              <div className="float-left ">
                <BackButton />
              </div>
            </div>
            <div className="w-full mx-auto">

                  <Row className="justify-content-center">
                  <h1 className="text-center mb-5 fontMarcellus text-wwbrown">Preguntas Frecuentes</h1>
                  </Row>
                  <Row>
                  <Accordion className="fontEB text-left">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>¿Cuáles son los métodos de pago aceptados?</Accordion.Header>
                    <Accordion.Body className="text-lg">
                      Aceptamos diversas formas de pago, como tarjetas de crédito/débito (Visa, Mastercard, American Express) y envío de dinero a través de Mercado Pago.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>¿Cuánto tiempo tarda en llegar mi pedido?</Accordion.Header>
                    <Accordion.Body className="text-lg">
                    El tiempo de entrega puede variar según tu ubicación y el método de envío seleccionado. Por lo general, intentamos procesar y enviar los pedidos en un plazo de 1 a 3 días hábiles. Una vez enviado, el tiempo de entrega estimado dependerá del servicio de mensajería y la ubicación del destinatario.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>¿Tienen una tienda física donde puedo visitarlos?</Accordion.Header>
                    <Accordion.Body className="text-lg">
                    Actualmente operamos exclusivamente en línea y no contamos con una tienda física. Sin embargo, nuestra tienda en línea está disponible las 24 horas del día, los 7 días de la semana para que puedas realizar tus compras cómodamente desde cualquier lugar.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>¿Qué hago si tengo un problema con mi pedido?</Accordion.Header>
                    <Accordion.Body className="text-lg">
                    Si tienes algún problema con tu pedido, como productos dañados o faltantes, o cualquier otra consulta, te recomendamos contactar a nuestro servicio de atención al cliente lo antes posible. Estaremos encantados de ayudarte a resolver cualquier inconveniente.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </Row>
            </div>
          </div>
      </Container>
    )
}
export default Faq;