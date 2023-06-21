import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Login = () => {

    return (
        <>
        <div>Login</div>
        <div>
         <GoogleLogin
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
        </>
    )
}

export default Login;