import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    return(
        <Navbar bg="light" expand="lg">
            <button className="btn1 btn--svg-small">Home</button>
            <SearchBar/>
            <button className="btn1 btn--svg-small">Login</button>
            <button className="btn1 btn--svg-small">Register</button>
        </Navbar>
    )
}

export default NavBar;