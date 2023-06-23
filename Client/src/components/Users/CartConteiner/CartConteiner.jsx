import { useSelector} from 'react-redux';
// import { clearCart } from '../../../../redux/userSlice';
import Cart from '../Cart/Cart';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import TotalPrice from '../TotalPrice/TotalPrice';

 const CartConteiner = () => {
    // const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.user.cartProducts);
    //console.log(cartProducts);
    
    //traigo productos de localstorage
    const shoppingCartProducts = localStorage.getItem('shoppingCart')

    const totalPrice = JSON.parse(shoppingCartProducts).reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    );

      useEffect(()=>{

      }, [JSON.parse(shoppingCartProducts)])

    return (
        <div className='p-8 flex'>
          <div className='w-2/3'>
                <h2>Carrito de compras</h2>
                <p>Aún no quieres finalizar tu compra <span className='font-bold'><NavLink to='/'>Sigue explorando</NavLink></span></p>
                {/* Renderiza los productos en el carrito */}
                {JSON.parse(shoppingCartProducts)?.map(product => (
                  <Cart
                  key={product.productId}
                  id={product.productId}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  product={product}
                />
                ))}
          <div className=''>
            <h5>Total</h5>
            <p>{<TotalPrice/>}</p>
          </div>
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