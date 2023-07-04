import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { filterCategory, getProducts } from '../../redux/userSlice';

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
    <div>
      <div>
        <h5>Welcome to</h5>
        <h1>WIZARDING WARES</h1>
      </div>
      <button onClick={() => handleAllProducts()}>Todos los productos</button>
      <br/>
      <button onClick={() => handleFilterCategory('Golosinas')}>Golosinas</button>
      <br/>
      <button onClick={() => handleFilterCategory('Indumentaria')}>Indumentaria</button>
      <br/>
      <button onClick={() => handleFilterCategory('Libros')}>Libros</button>
      <br/>
      <button onClick={() => handleFilterCategory('Quidditch')}>Quidditch</button>
      <br/>
      <button onClick={() => handleFilterCategory('Varitas')}>Varitas</button>
      <br/>
      <button onClick={() => handleFilterCategory('Misceláneas')}>Miscelaneas</button>
    </div>
  );
};

export default Landing;

