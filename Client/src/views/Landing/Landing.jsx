import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { filterCategory, getProducts } from '../../redux/userSlice';
import '../../components/Users/storeStyles.css'
const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFilterCategory = (category) => {
      dispatch(filterCategory(category));
      setSelectedCategory(category);
      navigate('/home');
    
  };
  const handleAllProducts = () => {
    dispatch(getProducts());
      navigate('/home');
  }

  return (
    <div className='storeComponent'>
      <div className='landingBg md:h-64 flex items-center justify-center'>
        <div>
          <h5 className='fontMarcellus text-wwwhite text-2xl'>Welcome to</h5>
          <img src="https://images2.imgbox.com/d5/e2/K5cFCN47_o.png" alt="Wizarding Wares" className='w-1/3 mx-auto'/>
        </div>
      </div>
          <button onClick={() => handleAllProducts()} className='btn1 btn--svg-small mt-4'>Todos los productos</button>
      <div className='flex flex-wrap justify-center mb-4'>
        <div className='imgGolosinas flex items-center justify-center w-1/4 hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
          onClick={() => handleFilterCategory('Golosinas')}
        >
          <h5 className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Golosinas</h5>
        </div>
        <div className='imgIndumentaria flex items-center justify-center w-1/4 hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
          onClick={() => handleFilterCategory('Indumentaria')}
        >
          <h5 className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Indumentaria</h5>
        </div>      
        <div className='imgLibros flex items-center justify-center w-1/4 hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
          onClick={() => handleFilterCategory('Libros')}
        >
          <h5 className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Libros</h5>
        </div>

        <div className='imgVaritas flex items-center justify-center w-1/4 hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
          onClick={() => handleFilterCategory('Varitas')}
        >
          <h5 className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Varitas</h5>
        </div>

        <div className='imgQuidditch flex items-center justify-center w-1/4 hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
          onClick={() => handleFilterCategory('Quidditch')}
        >
          <h5 className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Quidditch</h5>
        </div>

        <div className='imgMiscelaneas flex items-center justify-center w-1/4 hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
          onClick={() => handleFilterCategory('Misceláneas')}
        >
          <h5 className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Misceláneas</h5>
        </div>
      </div>
    </div>
  );
};

export default Landing;

