import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/home/Home'
import Detail from './components/Users/Detail/Detail'
import Admin from './views/Admin/Admin'
import CreateProduct from './components/Admin/Products/Create/CreateProduct'
import CartConteiner from './components/Users/CartConteiner/CartConteiner'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<CartConteiner/>}/>
        <Route path='/:id' element={<Detail/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/create' element={<CreateProduct/>} />
      </Routes>
    </div>
  )
}

export default App
