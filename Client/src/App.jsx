import { Route, Routes } from 'react-router-dom'
import './App.css'
import '../src/components/Users/storeStyles.css'
import Home from './views/home/Home'
import NavBar from './components/Users/NavBar/NavBar'
import Footer from './components/Users/Footer/Footer'
import Detail from './components/Users/Detail/Detail'
import Admin from './views/Admin/Admin'
import CartConteiner from './components/Users/CartConteiner/CartConteiner'
import Nosotros from './components/Users/OtrasPaginas/Nosotros'
import Faq from './components/Users/OtrasPaginas/FAQ'
import Terms from './components/Users/OtrasPaginas/Terms'
import Privacy from './components/Users/OtrasPaginas/Privacy'
import { useLocation } from 'react-router-dom'
import Login from './components/Users/Login/Login'
import Register from './components/Users/Register/Register'
import Checkout from './components/Users/Checkout/Checkout'
import MyPurchases from './components/Users/MyPurchases/MyPurchases'
import Success from './components/Users/BackUrls/Success/Success/Success'
import Failure from './components/Users/BackUrls/Failure'
import ReviewForm from './components/Users/ReviewForm/ReviewForm'
import axios from "axios";
// axios.defaults.baseURL = `http://wizardingwares-production.up.railway.app/`;
axios.defaults.baseURL = `http://localhost:3001/`;
import Landing from './views/Landing/Landing'


function App() {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div className='App flex flex-col min-h-screen bg-wwwhite'>
      {
        pathname !== '/admin' &&
        <NavBar className='fixed top-0 w-screen z-50'/>
      }
      <div className={(pathname === '/register' || pathname === '/login' ) ? 'storeComponent loginBg' : 'flex-grow '}>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/purchases' element={<MyPurchases/>} />
          <Route path='/reviews/:id' element={<ReviewForm/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/cart' element={<CartConteiner/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/:id' element={<Detail/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/nosotros' element={<Nosotros/>} />
          <Route path='/faq' element={<Faq/>} />
          <Route path='/terminosYCondiciones' element={<Terms/>} />
          <Route path='/politicaDePrivacidad' element={<Privacy/>} />
          <Route path='/success' element={<Success/>} />
          <Route path='/failure' element={<Failure/>} />
        </Routes>
      </div>
      {
        pathname !== '/admin' &&
        <Footer className='mt-auto' />
      }
    </div>
  )
}

export default App
