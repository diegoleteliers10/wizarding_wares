import Cardd from 'react-bootstrap/Card';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
const Cart = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await dispatch(removeFromCart(props.id))
        navigate('/cart')
    }

    return(
        <div className='storeComponentCard'>
            <Cardd>
                <img src={props.image} alt={props.name} title={props.name}/>
                <h2>{props.name}</h2>
                <h2>${props.price}</h2>
            </Cardd>
            <button value={props.productId} onClick={handleDelete} className='button'>
                <FiTrash2 />
            </button>
        </div>
    )
}

export default Cart