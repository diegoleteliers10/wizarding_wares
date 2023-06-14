import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    return(
         <div>
            <SearchBar/>
            <button className="btn btn--svg-small">Home</button>
            <button className="btn btn--svg-small">Login</button>
            <button className="btn btn--svg-small">Register</button>
        </div>
    )
}

export default NavBar;