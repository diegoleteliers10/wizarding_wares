import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/userSlice";
import BackButton from "../BackButton/BackButton";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import getCookie from "../../../hooks/getCookie";
import '../storeStyles.css';

const Detail = () => {
  const { products } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const loggedIn = getCookie('userInfo')

  // LOCALSTORAGE
  const [addCart, setAddCart] = useLocalStorage('shoppingCart', []);
  const sessionStorageKey = `product_${id}`;
  const [size, setSize] = useState('');
  const [error, setError] = useState('');

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock){
    setQuantity(quantity + 1);
    }else{
      window.alert('La cantidad seleccionada no puede sobrepasar la cantidad en stock!')
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && product.categoryCategoryId !== 3) {
      const productAndAssets = {
        ...product,
        quantity: quantity,
      };
      dispatch(addToCart(productAndAssets));
      setAddCart([...addCart, productAndAssets]);
    }

    if (product && size === '') {
      setError('¡Seleccione un talle antes de agregar al carrito!');
    } else if (product) {
      const productAndAssets = {
        ...product,
        quantity: quantity,
        size: size,
      };
      dispatch(addToCart(productAndAssets));
      setAddCart([...addCart, productAndAssets]);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const productFromSessionStorage = sessionStorage.getItem(sessionStorageKey);
  const product = productFromSessionStorage ? JSON.parse(productFromSessionStorage) : products.find((product) => product.productId === id);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setError('');
  };

  if (!product) {
    window.alert("No se encontró el producto");
  }

  useEffect(() => {
    if (product && product.isActive === false) {
      navigate('/');
    }
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(product));
  }, [product]);

  return (
    <div className="flex storeComponent h-screen items-center p-8">
      <div className="w-1/3">
        <BackButton />
        <img src={product.image} alt={product.name} />
      </div>
      <div className="w-2/3">
        <h2 className="titleDetail">{product.name}</h2>
        <p className="bigPrice">${product.price}</p>
        {product.categoryCategoryId === 3 || product.category === 'Indumentaria'? (
          <div>
            <fieldset onChange={handleSizeChange}>
              <div className="flex space-x-4 justify-center">
                <div>
                  <input type="radio" id="size1" name="contact" value="XS" />
                  <label htmlFor="size1">XS</label>
                </div>
                <div>
                  <input type="radio" id="size2" name="contact" value="S" />
                  <label htmlFor="size2">S</label>
                </div>
                <div>
                  <input type="radio" id="size3" name="contact" value="M" />
                  <label htmlFor="size3">M</label>
                </div>
                <div>
                  <input type="radio" id="size4" name="contact" value="L" />
                  <label htmlFor="size4">L</label>
                </div>
                <div>
                  <input type="radio" id="size5" name="contact" value="XL" />
                  <label htmlFor="size5">XL</label>
                </div>

                <div>
                  <input type="radio" id="size6" name="contact" value="XXL" />
                  <label htmlFor="size6">XXL</label>
                </div>
              </div>
            </fieldset>
            {error !== '' && (
              <div>
                <p className="text-wwmaroon font-medium">{error}</p>
              </div>
            )}
          </div>
        ) : null}
        <p className="descriptionDetail">{product.description}</p>
        <label>
          Cantidad:
          <button onClick={handleDecreaseQuantity} className="btn1 btn--svg-small">-</button>
          <span>{quantity}</span>
          <button onClick={handleIncreaseQuantity} className="btn1 btn--svg-small">+</button>
        </label>
        <button
          onClick={handleAddToCart}
          className={`btn1 btn--svg-small ${(size === '' && product.categoryCategoryId === 3) || (size === '' && product.category === 'Indumentaria') || !loggedIn ? ' disabled opacity-50 pointer-events-none' : ''}`}
          disabled={quantity === 0}
        >
          Añadir al carrito
        </button>
        <button onClick={handleGoToCart} className="btn1 btn--svg-small">Ir al carrito</button>
        <div className="mt-8">
          {
            !loggedIn && 
            <div>
              <h5 className="font-medium text-wwmaroon">
                ¡Debes iniciar sesión para poder agregar artículos al carrito!
              </h5>
              <p><NavLink to='/register'>Regístrate</NavLink></p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Detail;