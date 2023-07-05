import TotalPrice from '../TotalPrice/TotalPrice';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { createAddress, createPreference } from '../../../redux/userSlice';
import getCookie from '../../../hooks/getCookie';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const cart = useSelector(state => state.user.cartProducts)
    let userInfo = []
    
    const userInfoUnparsed = getCookie('userInfo')
    if(userInfoUnparsed !== ''){
        userInfo = JSON.parse(userInfoUnparsed)
    } 

    const shoppingCartProducts = localStorage.getItem('shoppingCart')
    // console.log(shoppingCartProducts);
    let parsedProducts = []
    if(shoppingCartProducts !== ''){
      // si hay productos los parseo
      parsedProducts = JSON.parse(shoppingCartProducts);    
      
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

 
    const handleCreatePreference = async () => {
      await dispatch(createPreference(items))
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
        // console.log(input);
        const body = await handleCreatePreference()
        // console.log(body);
        
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
            
        <div className="md:flex m-10 storeComponent items-center ">
            <div className="md:w-1/2 text-left flex-col ml-4">

            <a href="#" className="no-underline text-sm font-semibold text-gray-900" onClick={handleBack}
                >Volver al carrito <span aria-hidden="true">&larr;</span></a>

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
                            className="border rounded py-2 px-4 my-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                        <div>
                            {errors.name && (<span className="text-red-600 text-xs">{errors.name}</span>)}
                        </div>

                        <div className="mb-4 md:mt-6 lg:mt-8">
                            <label>
                            <span>Número de telefono</span>
                            <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Ej. 11 2345 6789"
                            onChange={handleChange}
                            value={input.phoneNumber}
                            className="border rounded py-2 px-4 my-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                        <div>
                        {errors.phoneNumber && (<span className="text-red-600 text-xs">{errors.phoneNumber}</span>)}
                        </div>

                        <div className="flex items-center">
                            <div className='w-1/2'>
                                <label>
                                <span>Calle</span>
                                <input
                                type="text"
                                name="street"
                                placeholder="Ej. Av. Santa Fe"
                                onChange={handleChange}
                                value={input.street}
                                className="border rounded py-2 px-4 my-2 shadow w-full bg-white"
                                required
                                />
                                </label>
                            </div>
                                
                            <div className='w-1/2'>
                                <label className="w-40 m-4">
                                <span>Altura</span>
                                <input
                                type="number"
                                name="number"
                                placeholder="Ej. 16548"
                                onChange={handleChange}
                                value={input.number}
                                className="border rounded py-2 px-4 my-2 shadow w-full bg-white"
                                required
                                />

                                </label>
                            </div>
                        </div>
                            <div className='w-1/2'>
                                    {errors.street && (<span className="text-red-600 text-xs">{errors.street}</span>)}
                            </div>

                        <div>
                            <label className="w-40">
                            <span>Departamento</span>
                            <input
                            type="text"
                            name="detail"   
                            placeholder="Ej. 4c"
                            onChange={handleChange}
                            value={input.detail}
                            className="border rounded py-2 px-4 my-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        
                            <label className="w-40 m-4">
                            <span>Código postal</span>
                            <input
                            type="number"
                            name="zipCode"
                            placeholder="Ej. 1645"
                            onChange={handleChange}
                            value={input.zipCode}
                            className="border rounded py-2 px-4 my-2 shadow w-full bg-white"
                            required
                            />

                            </label>
                        </div>

                    </div>
                    {!input.name || !input.phoneNumber || !input.street || !input.number || !input.zipCode ? 
                        <div className='mb-4 md:mb-0'>
                            <span className='text-red-600'>Se debe completar todo el formulario de envío!</span>
                        </div>
                        : ""
                    }
                </form>
                
            </div>

            <div className={parsedProducts.length >= 1 ? "md:w-1/3 h-1/3 rounded-lg p-6 flex flex-col justify-center bg-neutral-50 shadow" : "hidden"}>
                <label className="font-bold text-lg">Resumen de la compra</label>
                <div className="mb-4">
                    <span>({allItemsQuantity}) Items:</span>
                    <span className="font-bold">$<TotalPrice /></span>
                </div>
                
                <div className="mb-4">
                    <span className="font-bold">TOTAL:</span>
                    <span className="font-bold">$ <TotalPrice /></span>
                </div>

                <div className="flex items-center justify-center mt-6">
                    <button
                    onClick={handleBuy}
                    disabled={!input.name || !input.phoneNumber || !input.street || !input.number || !input.zipCode}
                    type="submit"
                    className={
                        parsedProducts.length >= 1 && input.name && input.phoneNumber && input.street && input.number && input.zipCode
                        ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        : "bg-blue-500  text-white font-bold py-1 px-2 rounded disabled pointer-events-none"
                    }
                    >
                    Pagar con Mercado Pago
                    </button>
                    {preferenceId && <Wallet initialization={{ preferenceId }} />}
                </div>

                
            </div>

        </div>
        
        
    )
}

export default Checkout;