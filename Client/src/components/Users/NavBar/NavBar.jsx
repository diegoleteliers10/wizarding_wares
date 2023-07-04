import SearchBar from "../SearchBar/SearchBar"
import Navbar from 'react-bootstrap/Navbar';
import '../storeStyles.css';
import { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/accountSlice";
import {RiLuggageCartLine} from "react-icons/ri";
import getCookie from "../../../hooks/getCookie";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const NavBar = () => {

    const {user} = useSelector(state => state.account);
    const {cartProducts, price} = useSelector(state=> state.user)
    //const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    const [cartItemCount, setCartItemCount] = useState(0);
    const [userName, setUserName] = useState('')
    const { pathname } = useLocation();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = getCookie('admin');
    
    useEffect(() => {
        const userInfo = getCookie('userInfo');
      
        if (userInfo) {
          try {
            const { name } = JSON.parse(userInfo);
            setUserName(name);
          } catch (error) {
            console.error('Invalid JSON format for userInfo:', error);
            setUserName('');
          }
        } else {
          setUserName('');
        }
      }, [user]);
    
  
    // actualizar cantidad de carrito
    useEffect(() => {
        const shoppingCart = localStorage.getItem('shoppingCart');
        
        if (shoppingCart) {
          try {
            const parsedCart = JSON.parse(shoppingCart);
            // const uniqueItemCount = parsedCart.length;
            // setCartItemCount(uniqueItemCount);
            const allItemsQuantity= parsedCart.reduce((acc, item) => acc + item.quantity, 0)
            setCartItemCount(allItemsQuantity);
          } catch (error) {
            console.error('Invalid JSON format for shoppingCart:', error);
            setCartItemCount(0);
          }
        } else {
          setCartItemCount(0);
        }
      }, [cartProducts, price, user]);

    const handleGoToCart = () => {
        navigate('/cart');
      };

    const handleGoHome = ()=> {
        navigate('/')
    }

    const handleLogin = ()=> {
        navigate('/login')
    }

    const handleRegister = ()=> {
        navigate('/register')
    }

    const handleAdmin = ()=> {
        navigate('/admin')
    }

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/")
        localStorage.setItem('shoppingCart', ['']);
    }

    const handleMyPurchases = () => {
      navigate('/purchases')
    }


    return(
        <div className="storeComponent">
        <Navbar expand="lg" className="navBar fixed top-0">
     
            <div className="mr-auto ml-8">
            {pathname !== '/' && <SearchBar />}
            </div>
           
            
            <div className="buttons">
                <button onClick={handleAdmin} className="text-wwwhite">{isAdmin && 'Admin'}</button>
            </div>
            <div>
                <button onClick={handleGoHome} className="mx-auto w-14"><img src="https://images2.imgbox.com/41/5c/UX8ZYgxS_o.png" alt="Wizarding Wares" /></button>
            </div>
            <div className="ml-auto buttons">
                
                {userName === '' ? 
                <div>
                <button onClick={handleLogin} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Login</button>
                <span className="text-wwwhite">|</span>
                <button onClick={handleRegister} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Register</button>
                </div>
                :
                <div>
                <span className="text-wwwhite fontEB">Hola de nuevo, {userName} </span>
                <span className="text-wwwhite">|</span>
                <button onClick={handleLogout} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Cerrar sesión</button>
                <button onClick={handleMyPurchases} className="font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">Mis Compras</button>
                </div>
                }
                
            </div>
            <div>
                <button onClick={handleGoToCart} className="mx-4 font-semibold text-wwwhite hover:text-wwbeige transition-colors duration-300">
                <RiLuggageCartLine className="text-3xl" />
                {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
                </button>
            </div>
        </Navbar>
        </div>
    )
}

export default NavBar;