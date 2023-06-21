import { useSelector} from 'react-redux';
// import { clearCart } from '../../../../redux/userSlice';
import Cart from '../Cart/Cart';

 const CartConteiner = () => {
    // const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.user.cartProducts);
    console.log(cartProducts)
    // const handleRemoveFromCart = (productId) => {
    //     dispatch(removeFromCart(productId));
    //   };
    
      // const handleClearCart = () => {
      //   dispatch(clearCart());
      // };
    return (
        <div>
      <h2>Carrito de compras</h2>
      {/* Renderiza los productos en el carrito */}
      {cartProducts?.map(product => (
        <Cart
        key={product.productId}
        id={product.productId}
        image={product.image}
        name={product.name}
        price={product.price}
    />
      ))}

      {/* Botón para limpiar el carrito */}
      {/* <button onClick={handleClearCart}>Limpiar carrito</button> */}
    </div>

    )
}
export default CartConteiner