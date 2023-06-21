import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/home/Home'
import Detail from './components/Users/Detail/Detail'
import Admin from './views/Admin/Admin'
import CreateProduct from './components/Admin/Products/Create/CreateProduct'
import CartConteiner from './components/Users/CartConteiner/CartConteiner'
import Nosotros from './components/Users/OtrasPaginas/Nosotros'
import Faq from './components/Users/OtrasPaginas/FAQ'
import Terms from './components/Users/OtrasPaginas/Terms'
import Privacy from './components/Users/OtrasPaginas/Privacy'


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<CartConteiner/>}/>
        <Route path='/:id' element={<Detail/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/nosotros' element={<Nosotros/>} />
        <Route path='/faq' element={<Faq/>} />
        <Route path='/terminosYCondiciones' element={<Terms/>} />
        <Route path='/politicaDePrivacidad' element={<Privacy/>} />
      </Routes>
    </div>
  )
}

export default App
