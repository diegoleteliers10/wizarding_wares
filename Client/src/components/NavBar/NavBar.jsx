import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    return(
         <Navbar bg="light" expand="lg">
         <button>Home</button>
         <SearchBar/>
         <button>Login</button><button>Register</button>
         </Navbar>
    )
}

export default NavBar;