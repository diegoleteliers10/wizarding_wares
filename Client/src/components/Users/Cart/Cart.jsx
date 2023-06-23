import Cardd from 'react-bootstrap/Card';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateTotalPrice } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Cart = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = props.product;

    const shoppingCartProducts = localStorage.getItem('shoppingCart')
    const jsonCart = JSON.parse(shoppingCartProducts);
    const productFound = jsonCart.find((element) => element.name === props.name)
    //console.log(productFound);

    // const handleDelete = async () => {
    //     await dispatch(removeFromCart(props.id))
    //     navigate('/cart')
    // }
    function handleDelete(){
        if (window.confirm('Seguro quieres eliminar este producto del carrito?')){
            const productIndex = jsonCart.findIndex((element) => element.name === props.name);
            if (productIndex !== -1) {
                jsonCart.splice(productIndex, 1);
                localStorage.setItem('shoppingCart', JSON.stringify(jsonCart));
            }
        navigate('/cart');
        dispatch(updateTotalPrice());
        }
    }
    
    const [quantity, setQuantity] = useState(productFound.quantity);

    // const handleIncreaseQuantity = async () => {
    //     setQuantity(quantity + 1)
    //     await dispatch(increaseQuantity(product))
    //     // dispatch(accion que haga  if(productAndQuantity.productId === props.id)productAndQuantity.quantity = action.payload, que antes va a ser seteada como props.quantity)
    // } 

    const handleIncreaseQuantity = () => {
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
      
        // Update the quantity in localStorage
        const updatedCart = JSON.parse(localStorage.getItem('shoppingCart')).map((element) => {
          if (element.productId === props.id) {
            return {
              ...element,
              quantity: updatedQuantity,
            };
          }
          return element;
        });
      
        localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
        dispatch(updateTotalPrice())
      };
      
      const handleDecreaseQuantity = () => {
        if (quantity > 1) {
          const updatedQuantity = quantity - 1;
          setQuantity(updatedQuantity);
      
          // Update the quantity in localStorage
          const updatedCart = JSON.parse(localStorage.getItem('shoppingCart')).map((element) => {
            if (element.productId === props.id) {
              return {
                ...element,
                quantity: updatedQuantity,
              };
            }
            return element;
          });
      
          localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
          dispatch(updateTotalPrice())
        }
      };
    


    return(

        <div className='flex justify-between'>
                <div className='flex h-1/2 gap-8 items-center'>
                    <button value={props.productId} onClick={handleDelete} className='button'>
                        <FiTrash2 />
                    </button>
                    <img src={props.image} alt={props.name} title={props.name} className='w-32'/>
                    <h5>{props.name}</h5>
                    <div>
                        Cantidad:
                        <button onClick={handleDecreaseQuantity} className="btn">-</button>
                        {/* <span>{props.quantity}</span> */}
                        <span>{productFound.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(product)} className="btn">+</button>
                    </div>          
                    <p>${props.price}</p>
                </div>
                {/* <span>Total: $ {{...props.price}*props.quantity}</span> */}
                


        </div>
    )
}

export default Cart
