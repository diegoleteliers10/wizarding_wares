import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./buttonBack.css"
import { Link } from "react-router-dom"

const Nosotros = () => {
    return(

      <Container>
       <Link to="/" className="btn btn-primary">Volver a Home</Link>
      <Row className="justify-content-center">
        <h1 className="text-center mb-5">Nosotros</h1>
      </Row>
      <Row>
        <p>En Wizarding Wares, nos apasiona el mágico mundo de Harry Potter y nos enorgullece ofrecer una amplia gama de productos relacionados con esta famosa saga. Somos un equipo de ocho programadores en pleno aprendizaje y desarrollo en el bootcamp de Full Stack Developer de Henry. Nuestro objetivo es combinar nuestras habilidades técnicas con nuestra pasión por Harry Potter para brindarte una experiencia de compra inolvidable.
        Nos comprometemos a proporcionarte una experiencia de compra fácil y segura. Nuestro sitio web está diseñado para ser intuitivo y fácil de navegar, lo que te permite encontrar rápidamente los productos que buscas. Además, nos aseguramos de mantener altos estándares de seguridad en cuanto a tus datos personales y de pago, para que puedas comprar con total confianza.
        </p>
        </Row>
       </Container>
    )
}
export default Nosotros;