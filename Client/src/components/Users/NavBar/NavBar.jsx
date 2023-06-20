import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';
import '../storeStyles.css'; 


const NavBar = () => {
    return(
        <div className="storeComponent">
        <Navbar expand="lg" className="navBar">
            <div className="mr-auto ml-8">
            <SearchBar/>
            </div>
            <div>
                <button className="mx-auto w-14"><img src="https://images2.imgbox.com/41/5c/UX8ZYgxS_o.png" alt="Wizarding Wares" /></button>
            </div>
            <div className="ml-auto buttons">
                <button className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Login</button>
                <span className="text-wwwhite">|</span>
                <button className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Register</button>
            </div>
        </Navbar>
        </div>
    )
}

export default NavBar;