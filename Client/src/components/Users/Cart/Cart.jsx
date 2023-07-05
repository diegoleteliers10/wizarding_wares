import Cardd from 'react-bootstrap/Card';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateTotalPrice } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopUpStore from '../PopUpStore/PopUpStore';
import '../storeStyles.css';

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = props.product;

  const shoppingCartProducts = localStorage.getItem('shoppingCart');
  const jsonCart = JSON.parse(shoppingCartProducts);

  const productFound = jsonCart.find((element) => element.name === props.name);

  // ESTADOS POP UP
  const [popUp, setPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  const handleConfirm = async () => {
    const productIndex = jsonCart.findIndex((element) => element.name === props.name);
    if (productIndex !== -1) {
      jsonCart.splice(productIndex, 1);
      localStorage.setItem('shoppingCart', JSON.stringify(jsonCart));
    }
    setPopUp(false);
    await dispatch(updateTotalPrice());
  };

  function handleDelete() {
    setPopUpMessage('¿Seguro quieres eliminar este producto del carrito?');
    setPopUp(true);
  }

  const [quantity, setQuantity] = useState(productFound && productFound.quantity);

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
    dispatch(updateTotalPrice());
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
      dispatch(updateTotalPrice());
    }
  };

  return (
    <>
      {popUp === true && (
        <PopUpStore trigger={popUp} setTrigger={setPopUp} handleConfirm={handleConfirm}>
          <h3 className='w-1/2 mx-auto text-3xl'>{popUpMessage}</h3>
        </PopUpStore>
      )}

      <tr key={product.productId} className='btmBorder'>
        <td>
          <div className='flex items-center storeComponent fontEB'>
            <button value={props.productId} onClick={handleDelete} className='button'>
              <FiTrash2 />
            </button>
            <div className='fotoFondoCart mr-4 my-2 flex items-center'>
              <img src={props.image} alt={props.name} title={props.name} className='md:w-32' />
            </div>
            <div>
              <h5>{props.name}</h5>
              <p className='text-wwbrown'>{productFound.size && `Talle: ${productFound.size}`}</p>
            </div>
          </div>
        </td>

        <td>
          <div className='flex items-center fontEB text-center text-lg md:text-xl'>
            <div className='flex items-center'>
              <button onClick={handleDecreaseQuantity} className='btn'>
                -
              </button>
              <span className=''>{productFound && productFound.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(product)} className='btn'>
                +
              </button>
            </div>
          </div>
        </td>

        <td className='text-xl fontEB'>${props.price}</td>
      </tr>
    </>
  );
};

export default Cart;
