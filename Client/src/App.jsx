import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/home/Home'
import Detail from './components/Detail/Detail'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:id' element={<Detail/>} />
      </Routes>
    </div>
  )
}

export default App
