import 'tailwindcss/tailwind.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1029819420881-buu62k2ngdvb25u9r3anfslhc57lfjps.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
 </Provider>,
)