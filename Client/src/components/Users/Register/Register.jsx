import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../redux/accountSlice";
import { useSelector } from "react-redux";
import '../storeStyles.css';
import { NavLink } from 'react-router-dom';

const Register = () => {

    const users = useSelector((state) => state.account.allUsers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState ({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

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
        const { name, email, password, confirmPassword } = input;
        if (!/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
          errors.name = 'El nombre no puede contener carácteres especiales';
        } else if (name.length < 3) {
          errors.name = 'El nombre debe tener al menos tres letras de longitud!';
        } else if(!email.trim() || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            errors.email = 'La dirección de email es incorrecta'
        } else if(users.some((user) => user.email === email)) {
            errors.email = "El email ya está siendo utilizado";
        } else if(!password.trim() || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)){
            errors.password = 'La contraseña debe tener al menos 6 caracteres, un numero, una minúscula, y una mayuscula!'
        } else if (password !== confirmPassword){
            errors.confirmPassword = 'La contraseña debe ser igual'
        }
        return errors;
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(createUser(input))
        // setInput({
        //     name: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        // })
        navigate('/login')
      }

    return(
        <div className="storeComponent h-screen flex">
           <div className="w-full mx-auto flex items-center justify-center my-8">
            <div>
                <form onSubmit={handleSubmit} className="bg-white p-12 rounded shadow-md max-w-sm">
                    <h4 className="fontMarcellus text-2xl uppercase font-bold">Crear usuario</h4>
                    <div className="formBox fontEB">

                        <div className="mb-2 md:mt-6 lg:mt-4 w-5/6 mx-auto">
                            <label htmlFor="name">
                                <input 
                                type="text" 
                                name="name"
                                placeholder="Nombre completo"
                                onChange={handleChange}
                                value={input.name}
                                className="border rounded py-2 px-4 shadow-sm w-full bg-white"
                                required
                                />
                            </label>
                            
                        </div>
                        <div>
                            {errors.name && (<span className="flex text-brown-600 w-2/3 mx-auto text-red-400">{errors.name}</span>)}
                        </div>
                        
                        <div className="mb-2 md:mt-6 lg:mt-4 w-5/6 mx-auto">
                            <label htmlFor="email">
                                <input 
                                type="email"
                                name="email" 
                                placeholder="Ingrese un email..."
                                value={input.email}
                                onChange={handleChange}
                                className="border rounded py-2 px-4 shadow-sm w-full bg-white"
                                required
                                />
                            </label>
                        </div>
                        <div>
                            {errors.email && (<span className="flex text-brown-600 w-2/3 mx-auto   text-red-400">{errors.email}</span>)}
                        </div>
                        
                        <div className="mb-2 md:mt-6 lg:mt-4 w-5/6 mx-auto">
                            <label htmlFor="password">
                                <input 
                                type="password" 
                                name="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                value={input.password}
                                className="border rounded py-2 px-4 shadow-sm w-full bg-white"
                                required
                                />
                            </label>
                        </div>
                        <div>
                            {errors.password && (<span className="flex text-brown-600 w-2/3 mx-auto   text-red-400">{errors.password}</span>)}
                        </div>
                        
                        <div className="mb-2 md:mt-6 lg:mt-4 w-5/6 mx-auto">
                            <label htmlFor="confirmPassword">
                                <input 
                                type="password" 
                                name="confirmPassword"
                                placeholder="Confirme su contraseña"
                                onChange={handleChange}
                                value={input.confirmPassword}
                                className="border rounded py-2 px-4 shadow-sm w-full bg-white"
                                required
                                />
                            </label>
                        </div>
                        <div>
                            {errors.confirmPassword && (<span className="text-brown-600 w-2/3 mx-auto   text-red-400">{errors.confirmPassword}</span>)}
                        </div>
                        
                    </div>

                    <div className="boton">
                    <button
                    className="btn1 btn--svg-small mt-4"
                    type="submit"
                    disabled={!input.name || errors.name || !input.email || errors.email || !input.password || errors.password || !input.confirmPassword || errors.confirmPassword}
                    >
                    Registrarse
                    </button>
                    <p className='mt-4 fontEB'>¿Ya tienes cuenta? <span><NavLink to='/login' className='no-underline font-semibold text-wwbrown hover:text-wwmaroon'>Iniciar Sesión</NavLink></span></p>
                </div>

                </form>                
            </div>
           </div>

        </div>
    )
}

export default Register;