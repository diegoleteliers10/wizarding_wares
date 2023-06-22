import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';
import '../storeStyles.css'; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/accountSlice";


const NavBar = () => {

    const user = useSelector(state => state.account.user)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGoToCart = () => {
        navigate('/cart')
    }
    const handleGoHome = ()=> {
        navigate('/')
    }

    const handleLogin = ()=> {
        navigate('/login')
    }

    const handleRegister = ()=> {
        navigate('/register')
    }

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
    }

    return(
        <div className="storeComponent">
        <Navbar expand="lg" className="navBar fixed top-0">
            <div className="mr-auto ml-8">
            <SearchBar/>
            </div>
            <div>
                <button onClick={handleGoHome} className="mx-auto w-14"><img src="https://images2.imgbox.com/41/5c/UX8ZYgxS_o.png" alt="Wizarding Wares" /></button>
            </div>
            <div className="ml-auto buttons">
                <button onClick={handleGoToCart} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Carrito</button>
                
                {user.length === 0 ? 
                <div>
                <button onClick={handleLogin} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Login</button>
                <span className="text-wwwhite">|</span>
                <button onClick={handleRegister} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Register</button>
                </div>
                :
                <div>
                <span className="text-wwwhite">Welcome back, {user.name} </span>
                <span className="text-wwwhite">|</span>
                <button onClick={handleLogout} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Cerrar sesión</button>
                </div>
                }
                
            </div>
        </Navbar>
        </div>
    )
}

export default NavBar;