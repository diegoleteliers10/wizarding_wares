import { useParams } from "react-router-dom";
import data from "../../../assets/data.json"
import { useState } from "react";
import '../storeStyles.css'; 

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
 console.log(product.Category)
    return(
        <div className="flex storeComponent">
            <div className="w-1/3">
                <img src={product.image} alt={product.name}/>
            </div>
            <div className="w-2/3">
                <h2 className="titleDetail">{product.name}</h2>
                <p className="bigPrice">{product.price}</p>
                {
                    product.Category === 'Indumentaria' && <div>
                        <fieldset>
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
                    </div>
                }
                <p className="descriptionDetail">{product.description}</p>
                <label>
                    Cantidad: 
                    <button onClick={handleDecreaseQuantity} className="btn1 btn--svg-small">-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity} className="btn1 btn--svg-small">+</button>
                </label>
                <button onClick={handleAddToCart} className="btn1 btn--svg-small">Añadir al carrito</button>
            </div>
        </div>
    )
}

export default Detail;