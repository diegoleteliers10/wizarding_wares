import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { getAllUsers, login, loginGoogle } from '../../../redux/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../storeStyles.css';
import { NavLink } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, message} = useSelector((state) => state.account)

    useEffect(() => {
        if(user.name && user.id && user.email && user.role){
            setInput({
                email: "",
                password: "",
            })
            navigate('/')
        } 
    }, [user]);
    
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
        .then (()=>{
            
        })
        .catch((error)=>{
            console.log('Error al intentar login', error)
        })
    };

    
    const handleGoogleLogin = (credentialResponse) => {
        const decoded = jwt_decode(credentialResponse.credential);
        const googleInfoLogin ={
            email: decoded.email,
            email_verified: decoded.email_verified
        }
        dispatch(loginGoogle(googleInfoLogin));
        //navigate('/')
      };

    return (
        <>
        <div className='w-1/2 mx-auto flex items-center storeLoginForm'>
            <div>
                <div>
                    {
                        message && 
                        <p>{message}</p>
                    }
                </div>
                
                <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
                    <div>
                        <span className="text-gray-700 text-2xl font-bold uppercase mb-4">Login</span>
                        <input required type="email" placeholder="Ingrese su email" className="w-full mb-4 h-10 rounded border-gray-300 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-white" name="email" value={input.email} onChange={handleChange}/>
                        <input required type="password" placeholder="Ingrese su contraseña" name="password" className="w-full mb-4 h-10 rounded border-gray-300 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-white" value={input.password} onChange={handleChange}/>
                    </div>
                    
                    <button 
                        className="w-1/2 py-2 px-4 rounded text-white bg-indigo-500 border-dashed border-indigo-500 hover:text-indigo-500 hover:bg-white transition duration-500 ease-in-out"
                        type='submit'    
                    >
                        Login
                    </button>
                    <p className='mt-4'>Aún no tienes cuenta? <span><NavLink to='/register' className='no-underline'>Registrarse</NavLink></span></p>                
                </form> 

                <div className='flex justify-center'>
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        </div>

        </>
    )
}


export default Login;