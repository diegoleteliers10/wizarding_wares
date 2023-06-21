import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./buttonBack.css"
import { Link } from "react-router-dom"

const Terms = () => {
  return (
    <Container>
    <Link to="/" className="btn btn-primary">Volver a Home</Link>
      <Row className="justify-content-center">
        <h1 className="text-center mb-5">Términos y Condiciones</h1>
      </Row>
      <Row>
        <div className="content">
          <p>
            Bienvenido(a) a Wizarding Wares. Antes de utilizar nuestro sitio
            web, te invitamos a leer detenidamente los siguientes términos y
            condiciones. Al acceder y utilizar este sitio, aceptas estar
            legalmente obligado(a) por estos términos y condiciones. Si no estás
            de acuerdo con alguno de estos términos, te pedimos que no utilices
            nuestro sitio web.
          </p>
          <p>
            <strong>Uso del Sitio Web</strong>
            <br />
            1.1. Todo el contenido y la información proporcionados en este sitio
            web se ofrecen únicamente con fines informativos. No nos hacemos
            responsables de la exactitud, integridad o actualidad de dicha
            información.
            <br />
            1.2. Queda prohibido utilizar este sitio web para cualquier
            propósito ilegal, difamatorio, ofensivo o que viole los derechos de
            propiedad intelectual de terceros.
            <br />
            1.3. Nos reservamos el derecho de modificar, suspender o interrumpir
            el acceso al sitio web en cualquier momento y sin previo aviso.
          </p>
          <p>
            <strong>Propiedad Intelectual</strong>
            <br />
            2.1. Todo el contenido disponible en Henry Potter Shop, incluyendo,
            pero no limitado a, texto, gráficos, logotipos, imágenes, videos,
            iconos y software, está protegido por derechos de autor, marcas
            registradas y otras leyes de propiedad intelectual.
            <br />
            2.2. Queda estrictamente prohibida la reproducción, distribución,
            modificación, publicación o cualquier otro uso no autorizado del
            contenido sin nuestro consentimiento expreso por escrito.
          </p>
          <p>
            <strong>Privacidad</strong>
            <br />
            3.1. La privacidad de nuestros usuarios es importante para nosotros.
            Toda la información personal recopilada se utiliza de acuerdo con
            nuestra Política de Privacidad. Al utilizar este sitio web, aceptas
            nuestra recopilación, uso y divulgación de información personal de
            acuerdo con nuestra Política de Privacidad.
          </p>
          <p>
            <strong>Enlaces a Terceros</strong>
            <br />
            4.1. Este sitio web puede contener enlaces a sitios de terceros.
            Dichos enlaces se proporcionan únicamente para tu conveniencia. No
            tenemos control sobre el contenido, las políticas de privacidad o
            las prácticas de los sitios web de terceros, por lo que no asumimos responsabilidad alguna por ellos.
            </p>
            <p>
            <strong>Limitación de Responsabilidad</strong>
            <br />
            5.1. En la máxima medida permitida por la ley aplicable, renunciamos
            a cualquier responsabilidad por daños directos, indirectos,
            incidentales, consecuentes o punitivos derivados del uso o la
            imposibilidad de uso de este sitio web.
            </p>
            <p>
            <strong>Ley Aplicable y Jurisdicción</strong>
            <br />
            6.1. Estos términos y condiciones se regirán e interpretarán de
            acuerdo con las leyes del país en el que operamos. Cualquier disputa
            relacionada con este sitio web estará sujeta a la jurisdicción
            exclusiva de los tribunales competentes en ese país.
            </p>
            <p>
            Gracias por leer y aceptar nuestros Términos y Condiciones de Uso.
            Si tienes alguna pregunta o inquietud, no dudes en contactarnos.
            ¡Disfruta de tu experiencia de compra en Wizarding Wares!
            </p>
            </div>
            </Row>
            </Container>
            );
            };

export default Terms;
           
