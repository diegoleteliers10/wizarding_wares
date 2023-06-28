import TotalPrice from '../TotalPrice/TotalPrice';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';

const Checkout = () => {
    
    const dispatch = useDispatch();

    const user = useSelector(state => state.account.user)
    const cart = useSelector(state => state.user.cartProducts)
    

    const shoppingCartProducts = localStorage.getItem('shoppingCart')
    console.log(shoppingCartProducts);
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
    console.log(items);

    const [preferenceId, setPreferenceId] = useState(null)

    initMercadoPago(import.meta.env.VITE_PUBLIC_KEY);

    // const createPreference = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:3001/create-order", {items});
    //     const { id } = response.data; // Obtener el ID de la preferencia
    //     return id;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const handleBuy = async () => {
    //     const id = await createPreference()
    //     if (id) {
    //         setPreferenceId(id)
    //     }
    // }
    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3001/create-order", {items});
        const { body } = response.data; // Obtiene el objeto body para luego poder usar la propiedad init_point
        return body;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        const body = await createPreference()
        console.log(body);
        if(body){
            //redirecciona al usuario a la URL de mercadopago
            window.location.href = await body.init_point
            setPreferenceId(body.id)
        }
    }

    // console.log(cart);

    const [input, setInput] = useState({
    phoneNumber: "",
    detail:"",
    zipCode: 0,
    street: "",
    number: "",
    name: ""    
    });

    const [errors, setErrors] = useState({
        phoneNumber: "",
        detail:"",
        zipCode: 0,
        street: "",
        number: "",
        name: ""    
        });

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
            <div className="w-2/3 border border-gray-500">
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
            </div>

            <div className="w-1/3 bg-white shadow-md">
                <label>Resumen de la compra</label>
                <div className='mb-4'>
                    <span>({cart?.length}) Items:</span>
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
                    <span> $ 900 </span>
                </div>

                <div className='mb-4'>
                    <span>TOTAL: </span>
                    <span>$ {84000    +900}</span>
                </div>

                <div>
                    <button onClick={handleBuy} type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Pagar con Mercado Pago    
                    </button>
                    {preferenceId && <Wallet initialization={{ preferenceId }} />}                   
                </div>
            </div>
        </div>
        
    )
}

export default Checkout;