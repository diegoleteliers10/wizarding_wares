import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../../../redux/accountSlice';
import { useDispatch } from 'react-redux';
import "./Login.module.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllUsers())
    });
    
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
       setInput({
        ...input,
        [event.target.name] : event.target.value
       }) 
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(login(input))
        setInput({
            email: "",
            password: "",
        })
        navigate('/')
    };

    return (
        <>
        <div>
            
            <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-700 text-2xl font-bold uppercase mb-4">Login</span>
                    <input required type="email" placeholder="Ingrese su email" className="w-full mb-4 h-10 rounded border-gray-300 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200" name="email" value={input.email} onChange={handleChange}/>
                    <input required type="password" placeholder="Ingrese su contraseña" name="password" className="w-full mb-4 h-10 rounded border-gray-300 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200" value={input.password} onChange={handleChange}/>
                </div>
                
                <button 
                    className="w-1/2 py-2 px-4 rounded text-white bg-indigo-500 border-dashed border-indigo-500 hover:text-indigo-500 hover:bg-white transition duration-500 ease-in-out"
                    type='submit'    
                >
                    Login
                </button>
            </form> 

            <div>
                <GoogleLogin
                    className="flex justify-center"
                    onSuccess={credentialResponse => {
                    console.log(credentialResponse.credential);
                    var decoded = jwt_decode(credentialResponse.credential);
                    console.log(decoded);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>

        </div>

        </>
    )
}

export default Login;