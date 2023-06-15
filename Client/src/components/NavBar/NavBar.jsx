import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    return(
         <div>
         <button className="btn btn--svg-small">Home</button>
         <SearchBar/>
         <button className="btn btn--svg-small">Login</button>
         <button className="btn btn--svg-small">Register</button>
        </div>
=======
         <Navbar bg="light" expand="lg">
         <button>Home</button>
         <SearchBar/>
         <button>Login</button><button>Register</button>
         </Navbar>
    )
}

export default NavBar;