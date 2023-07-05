import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import '../storeStyles.css';
import BackButton from "../BackButton/BackButton";

const Privacy = () => {
  return (
    <Container className="mt-8">
        <div className="w-full">
          <div className="float-left ">
            <BackButton />
           </div>
        </div>
      <Row className="justify-content-center">
        <h1 className="text-center mb-5 fontMarcellus text-wwbrown">Política de Privacidad</h1>
      </Row>
      <Row className="fontEB px-8">
        <div className="content">
          <p className="text-xl">
            Bienvenido/a a Wizarding Wares. Apreciamos la confianza que depositas en nosotros al utilizar nuestro sitio web y nos comprometemos a proteger tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos tu información personal cuando interactúas con nuestro sitio. Al acceder y utilizar este sitio, aceptas estar legalmente obligado/a por esta política de privacidad.
          </p>
          <p className="text-left">
            <strong className="text-center text-lg">Recopilación de Información</strong>
            <br />
            1.1. Recopilamos información personal que nos proporcionas directamente al crear una cuenta, realizar una compra o comunicarte con nosotros a través de nuestro sitio web.
            <br />
            1.2. También podemos recopilar información automáticamente a través de cookies y tecnologías similares cuando navegas por nuestro sitio.
          </p>
          <p className="text-left">
            <strong className="text-center text-lg">Uso de la Información</strong>
            <br />
            2.1. Utilizamos la información recopilada para procesar tus pedidos, brindarte soporte al cliente, personalizar tu experiencia de compra y mejorar nuestros servicios y comunicaciones contigo.
            <br />
            2.2. No compartimos tu información personal con terceros, excepto en casos limitados donde sea necesario para cumplir con nuestras obligaciones legales o para brindar servicios específicos solicitados por ti.
          </p>
          <p className="text-left">
            <strong className="text-center text-lg">Seguridad de la Información</strong>
            <br />
            3.1. Implementamos medidas de seguridad para proteger tu información personal contra accesos no autorizados, uso indebido o divulgación.
            <br />
            3.2. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet o método de almacenamiento electrónico es completamente seguro. Aunque nos esforzamos por proteger tu información, no podemos garantizar su seguridad absoluta.
          </p>
          <p className="text-left">
            <strong className="text-center text-lg">Derechos del Usuario</strong>
            <br />
            4.1. Tienes el derecho de acceder, corregir, actualizar o eliminar tu información personal que tenemos almacenada.
            <br />
            4.2. Si deseas ejercer tus derechos o tienes alguna pregunta o inquietud relacionada con nuestra Política de Privacidad, contáctanos a través de los medios proporcionados al final de esta página.
          </p>
          <p className="text-left">
            <strong className="text-center text-lg">Modificaciones a esta Política</strong>
            <br />
            5.1. Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Te recomendamos revisar periódicamente esta página para estar al tanto de cualquier cambio.
          </p>
          <p className="text-center text-lg font-semibold">
            Gracias por leer y aceptar nuestra Política de Privacidad. Si tienes alguna pregunta o inquietud, no dudes en contactarnos. Tu privacidad es importante para nosotros en Wizarding Wares.
            </p>
        </div>
      </Row>
    </Container>
  );
};
export default Privacy;
