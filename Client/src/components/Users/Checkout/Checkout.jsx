import TotalPrice from '../TotalPrice/TotalPrice';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { createAddress } from '../../../redux/userSlice';
import getCookie from '../../../hooks/getCookie';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const cart = useSelector(state => state.user.cartProducts)
    console.log(cart)
    let userInfo = []
    
    const userInfoUnparsed = getCookie('userInfo')
    if(userInfoUnparsed !== ''){
        userInfo = JSON.parse(userInfoUnparsed)
    } 
    console.log(userInfo.id);

    const shoppingCartProducts = localStorage.getItem('shoppingCart')
    // console.log(shoppingCartProducts);
    let parsedProducts = []
    if(shoppingCartProducts !== ''){
      // si hay productos los parseo
      parsedProducts = JSON.parse(shoppingCartProducts);
      console.log(parsedProducts);
      
    }   

    const items = parsedProducts.map(product => ({
        title: product.name,
        description: product.description,
        unit_price: Number(product.price),
        quantity: Number(product.quantity)
    }))

    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago(import.meta.env.VITE_PUBLIC_KEY);

    const allItemsQuantity= items.reduce((acc, item) => acc + item.quantity, 0)

 
    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3001/create-order", {items});
        const { body } = response.data; // Obtiene el objeto body para luego poder usar la propiedad init_point
        return body;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBack = () => {
        navigate('/cart')
    }
   
    
    const [input, setInput] = useState({
        phoneNumber: "",
        detail:"",
        zipCode: 0,
        street: "",
        number: "",
        name: "",
        userId: userInfo.id
    });
    
    const [errors, setErrors] = useState({
        phoneNumber: "",
        detail:"",
        zipCode: 0,
        street: "",
        number: "",
        name: ""    
    });
    
    const handleBuy = async (event) => {
        event.preventDefault();
        await dispatch(createAddress(input))
        console.log(input);
        const body = await createPreference()
        console.log(body);
        if(body){
            //redirecciona al usuario a la URL de mercadopago
            window.location.href = await body.init_point
            setPreferenceId(body.id)
        }
    }

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
    }

    const validate = (input) => {
        let errors = {};
        const { name, number, street, zipCode, detail, phoneNumber } = input;
        if (!name.trim() || !/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
          errors.name = 'El nombre debe contener únicamente letras';
        } else if (name.length < 3) {
          errors.name = 'El nombre debe tener al menos tres caractéres de longitud!';
        }else if(!/^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/.test(phoneNumber)){
            errors.phoneNumber = 'El número de telefono es incorrecto'
        }else if(!/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(street)){
            errors.street = 'La nombre de la calle no puede contener números'
        }
        return errors;
      };

    return(

        <div className="flex mt-10">
            <div className="w-2/3">
                <h2>Datos de envío</h2>

                <form>
                    <div className="formBox">

                        <div className="mb-4 md:mt-6 lg:mt-8">
                            <label htmlFor="name">
                            <span>Nombre completo</span>
                            <input
                            type="text"
                            name="name"
                            placeholder="Nombre completo"
                            onChange={handleChange}
                            value={input.name}
                            className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                        <div>
                            {errors.name && (<span className="flex text-red-600 justify-center items-center">{errors.name}</span>)}
                        </div>

                        <div className="mb-4 md:mt-6 lg:mt-8">
                            <label htmlFor="name">
                            <span>Número de telefono</span>
                            <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Ej. 11 2345 6789"
                            onChange={handleChange}
                            value={input.phoneNumber}
                            className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                        <div>
                        {errors.phoneNumber && (<span className="flex text-red-600 justify-center items-center">{errors.phoneNumber}</span>)}
                        </div>

                        <div className=''>
                            <label htmlFor="name">
                            <span>Calle</span>
                            <input
                            type="text"
                            name="street"
                            placeholder="Ej. Av. Santa Fe"
                            onChange={handleChange}
                            value={input.street}
                            className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                            required
                            />
                            <div>
                                {errors.street && (<span className="flex text-red-600 justify-center items-center">{errors.street}</span>)}
                            </div>
                            </label>

                            

                            <label htmlFor="name">
                            <span>Altura</span>
                            <input
                            type="number"
                            name="number"
                            placeholder="Ej. 16548"
                            onChange={handleChange}
                            value={input.number}
                            className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                        <div>
                            <label htmlFor="name">
                            <span>Departamento</span>
                            <input
                            type="text"
                            name="detail"
                            placeholder="Ej. 4c"
                            onChange={handleChange}
                            value={input.detail}
                            className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                            required
                            />

                            </label>

                            <label htmlFor="name">
                            <span>Código postal</span>
                            <input
                            type="number"
                            name="zipCode"
                            placeholder="Ej. 1645"
                            onChange={handleChange}
                            value={input.zipCode}
                            className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                    </div>
                </form>
                <button onClick={handleBack} className='bg-wwbrown text-wwwhite p-2 fontMarcellus hover:bg-wwmaroon'>Volver al carrito</button>
            </div>

            <div className={parsedProducts.length >= 1 ? "w-1/3 bg-white shadow-md" : "hidden"}>
                <label>Resumen de la compra</label>
                <div className='mb-4'>
                    {/* <span>({cart?.length}) Items:</span> */}
                    <span>({allItemsQuantity}) Items:</span>
                    <span> $<TotalPrice /> </span>
                </div>

                <div className='mb-4'>
                    <span>Subtotal:</span>
                    <span> $<TotalPrice /> </span>
                </div>

                <br />

                <div className='mb-4'>
                    <span>Envio:</span>
                </div>    

                <div className='mb-4'>
                    <span>(Correo Argentino):</span>
                    <span> $ </span>
                </div>

                <div className='mb-4'>
                    <span>TOTAL: </span>
                    <span>$ {}</span>
                </div>

                <div>
                    <button onClick={handleBuy} type='submit' className={parsedProducts.length >= 1 ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled pointer-events-none" }>
                        Pagar con Mercado Pago    
                    </button>
                    {preferenceId && <Wallet initialization={{ preferenceId }} />}                   
                </div>
            </div>
        </div>
        
    )
}

export default Checkout;