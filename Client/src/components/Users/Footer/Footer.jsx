import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='bg-wwbrown w-screen footerWw text-wwwhite'>
      <Row>
        <Col>
          Aca va el logo
        </Col>
        <Col>
          <h4>Información</h4>
          <Link to="/nosotros" className="footer-link">Nosotros</Link>
          <br />
          <Link to="/faq" className="footer-link">FAQ</Link>
        </Col>
        <Col>
          <h4>Legal</h4>
          <Link to="/terminosYCondiciones" className="footer-link">Términos y Condiciones</Link>
          <br />
          <Link to="/politicaDePrivacidad" className="footer-link">Política de Privacidad</Link>
        </Col>
      </Row>
      <div>
        <p>2023 - Wizarding Wares | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;