import { useSelector} from 'react-redux';
// import { clearCart } from '../../../../redux/userSlice';
import Cart from '../Cart/Cart';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import TotalPrice from '../TotalPrice/TotalPrice';
import { useNavigate } from "react-router-dom";
import '../storeStyles.css';


 const CartConteiner = () => {
    // const dispatch = useDispatch();
    const price = useSelector((state) => state.user.price);
    //console.log(cartProducts);
    
    const navigate = useNavigate();
    
    const handleGoCheckout = ()=> {
      navigate('/checkout')
  }
    //traigo productos de localstorage
    const shoppingCartProducts = localStorage.getItem('shoppingCart')
    let parsedProducts = []
    if(shoppingCartProducts !== ''){
      // si hay productos los parseo
      parsedProducts = JSON.parse(shoppingCartProducts);
      
    }    

    useEffect(()=>{
        //cuando se actualiza el precio actualizo componente y ve si mantener el boton de pago activo o no
      }, [price])

      let key = 1;
    return (
        <div className='p-8 flex'>
          <div className='w-2/3'>
                <h2>Carrito de compras</h2>
                <p>Aún no quieres finalizar tu compra <span className='font-bold'><NavLink to='/'>Sigue explorando</NavLink></span></p>
                {/* Renderiza los productos en el carrito */}
                {parsedProducts?.map(product => (
                  <Cart
                  key={key++}
                  id={product.productId}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  product={product}
                />
                ))}
            {
              parsedProducts.length < 1 ?
              <h4>El carrito está vacío</h4> :
              <div className=''>
                <h5>Total</h5>
                <p>${<TotalPrice/>}</p>
                <button onClick={handleGoCheckout} className={parsedProducts.length >= 1 ? 'bg-wwbrown text-wwwhite p-2 fontMarcellus hover:bg-wwmaroon' : 'bg-wwbrown text-wwwhite p-2 fontMarcellus opacity-50 disabled pointer-events-none'}>Pagar</button>
              </div>
            }
          </div>

      {/* Botón para limpiar el carrito */}
      {/* <button onClick={handleClearCart}>Limpiar carrito</button> */}

      <div className='w-1/4 flex items-center justify-center'>
        <img src="https://images2.imgbox.com/fd/6c/G7RaQ7gq_o.png" alt="Trunk" />
      </div>
    </div>

    )
}
export default CartConteiner