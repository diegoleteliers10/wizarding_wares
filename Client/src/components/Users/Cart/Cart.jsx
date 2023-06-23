import Cardd from 'react-bootstrap/Card';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeFromCart, decreaseQuantity, increaseQuantity } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Cart = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = props.product

    const handleDelete = async () => {
        await dispatch(removeFromCart(props.id))
        navigate('/cart')
    }
    
    const [quantity, setQuantity] = useState(props.quantity)

    const handleIncreaseQuantity = async () => {
        setQuantity(quantity + 1)
        await dispatch(increaseQuantity(product))
        // dispatch(accion que haga  if(productAndQuantity.productId === props.id)productAndQuantity.quantity = action.payload, que antes va a ser seteada como props.quantity)
    } 

    const handleDecreaseQuantity = async () => {
            if (quantity > 1) {setQuantity(quantity - 1)
            await dispatch(decreaseQuantity(product))}
    } 



    return(

        <div className='storeComponentCard'>
    
            <Cardd>
                <img src={props.image} alt={props.name} title={props.name}/>
                <h2>{props.name}</h2>
                <h2>${props.price}</h2>
            </Cardd>
            {/* <span>Total: $ {{...props.price}*props.quantity}</span> */}
            <button value={props.productId} onClick={handleDelete} className='button'>
                <FiTrash2 />
            </button>

            <label>
                Cantidad:
                <button onClick={handleDecreaseQuantity} className="btn1 btn--svg-small">-</button>
                <span>{props.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(product)} className="btn1 btn--svg-small">+</button>
            </label>

        </div>
    )
}

export default Cart
