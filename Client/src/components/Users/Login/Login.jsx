import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { getAllUsers, login, loginGoogle } from '../../../redux/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../storeStyles.css';
import { NavLink } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, message} = useSelector((state) => state.account)

    useEffect(() => {
        if(user.name && user.id && user.email && user.role){
            toast.success('Inicio de sesión exitoso',{
                style: {
                    border: '1px solid #692323',
                    padding: '16px',
                    color: '#692323',
                }
            });
            setTimeout(()=>{
                setInput({
                    email: "",
                    password: "",
                })
                navigate('/')
                toast.dismiss()
            },800)
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
            name: decoded.name,
            email: decoded.email,
            email_verified: decoded.email_verified
        }
        dispatch(loginGoogle(googleInfoLogin));
        //navigate('/')
      };

    return (
        <>
        <Toaster/>
        <div className='storeComponent'>
            <div className='z-10 mx-auto flex items-center justify-center storeLoginForm'>
                <div className='w-1/2 mx-auto flex items-center justify-center storeLoginForm'>
                    <div className='w-72 formLogin'>
                        <div className='absolute right-40 -scale-50 flex justify-end'>
                            <img src="https://miro.medium.com/v2/resize:fit:602/1*2hvodzPPjdPcXpOY-2_IwA.gif" alt="Huellas" className='patas' />
                        </div>
                        <div className='absolute left-40 -z-0 scale-50 flex justify-end'>
                            <img src="https://miro.medium.com/v2/resize:fit:602/1*2hvodzPPjdPcXpOY-2_IwA.gif" alt="Huellas" className='patas' />
                        </div>
                        
                        <form className="bg-white p-8 rounded shadow-xl" onSubmit={handleSubmit}>
                            <div>
                                {
                                    message && 
                                    <p className='italic text-red-500 text-xs'>{message}</p>
                                }
                            </div>
                            <div className='grid fontEB'>
                                <span className="text-gray-700 text-2xl font-bold uppercase mb-8 fontMarcellus">Iniciar Sesión</span>
                                <input required type="email" placeholder="Ingrese su email" className="w-full mb-4 h-10 rounded border-gray-300 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-gray-300 " name="email" value={input.email} onChange={handleChange}/>
                                <input required type="password" placeholder="Ingrese su contraseña" name="password" className="w-full mb-4 h-10 rounded border-gray-300 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-gray-300" value={input.password} onChange={handleChange}/>
                            </div>
                            
                            <button 
                                className="btn1 btn--svg-small"
                                type='submit'    
                            >
                                Login
                            </button>
                        <div className='flex justify-center mt-8'>
                            <GoogleLogin
                                theme="light"
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                            <p className='mt-4 fontEB'>¿Aún no tienes cuenta? <span><NavLink to='/register' className='no-underline font-semibold text-wwbrown hover:text-wwmaroon'>Registrarse</NavLink></span></p>                
                        </form> 

                    </div>
                </div>

            </div>
        </div>
        </>
    )
}


export default Login;