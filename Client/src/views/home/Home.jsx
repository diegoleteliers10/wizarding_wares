import Cards from "../../components/Users/Cards/Cards";
import Footer from "../../components/Users/Footer/Footer";
import NavBar from "../../components/Users/NavBar/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Home = () => {
    return(
        <div>
            <NavBar />

            < Cards />
            
            < Footer />
        </div>

    )
}

export default Home;