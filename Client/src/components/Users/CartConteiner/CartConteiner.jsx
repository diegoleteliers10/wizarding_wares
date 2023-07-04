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
        <div className='p-8 flex h-screen storeComponent'>
          <div className='w-2/3 mt-10 pr-12'>
                <h2 className='fontMarcellus text-left'>Carrito de compras</h2>
                {parsedProducts.length >= 1 ? <p className='fontEB text-left'>¿Aún no quieres finalizar tu compra? <span><NavLink to='/' className={'no-underline text-wwbrown font-bold'}>Sigue explorando</NavLink></span></p>:<p className='fontEB text-left'>¿Aún no tienes productos en tu carrito? <span><NavLink to='/' className={'no-underline text-wwbrown font-bold'}>Sigue explorando</NavLink></span></p>}
                {/* Renderiza los productos en el carrito */}
                <div className="cart-list-container" style={{ height: '24em', overflow: 'auto' }}>
                <table className='w-full text-left mt-8'>
                  <thead>
                    <tr className='btmBorder'>
                      <th className='fontMarcellus uppercase'>Productos</th>
                      <th className='fontMarcellus uppercase'>Cantidad</th>
                      <th className='fontMarcellus uppercase'>Precio</th>
                    </tr>
                  </thead>
                  <tbody className=''>
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
                  </tbody>
                
                </table>
                </div>
            {
              parsedProducts.length < 1 ?
              <h4 className='fontMarcellus'>El carrito está vacío</h4> :
              <div className='mt-8 text-end'>
                <div className='flex justify-end items-center'>
                <h5 className='mr-24 fontMarcellus text-wwbrown'>Total:</h5>
                <p className='fontEB text-xl font-semibold text-wwbrown'>${<TotalPrice/>}</p>
                </div>
                <button onClick={handleGoCheckout} className={parsedProducts.length >= 1 ? 'bg-wwbrown text-wwwhite p-2 btn1 btn--svg-small' : 'bg-wwbrown text-wwwhite p-2 fontMarcellus btn1 btn--svg-small opacity-50 disabled pointer-events-none'}>Pagar</button>
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