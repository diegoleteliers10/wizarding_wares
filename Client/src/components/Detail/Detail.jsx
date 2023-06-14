import { useParams } from "react-router-dom";
import data from "../../assets/data.json"
import { useState } from "react";

const Detail = () => {
    const { id } = useParams();
    const product = data.find((product) => product.productId === parseInt(id));
    const [quantity, setQuantity] = useState(0);

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1)
    } 

    const handleDecreaseQuantity = () => {
        if(quantity > 0) {
            setQuantity(quantity - 1)
        }
    } 

    const handleAddToCart = () => {
        //funcion para agregar al carrito
        window.alert("Se añadio al carrito:  " + quantity + " " + product.name)
    }

    if(!product) return window.alert("No se encontro el producto")

    return(
        <div>
            <img src={product.image} alt={product.name}/>
            <h2>{product.name}</h2>
            <p>Precio: {product.price}</p>
            <p>{product.description}</p>
            <label>
                Cantidad: 
                <button onClick={handleDecreaseQuantity} className="btn btn--svg-small">-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity} className="btn btn--svg-small">+</button>
            </label>
            <button onClick={handleAddToCart} className="btn btn--svg-small">Añadir al carrito</button>
        </div>
    )
}

export default Detail;