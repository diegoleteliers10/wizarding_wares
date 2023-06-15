import Cards from "../../components/Cards/Cards";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Home = () => {
    return(
        <Container>
            <NavBar />

            < Cards />
            
            < Footer />
        </Container>
    )
}

export default Home;