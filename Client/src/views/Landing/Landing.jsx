import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { filterCategory, getProducts, setSearchTerm } from '../../redux/userSlice';
import Slider from "react-slick";
import Cookies from 'js-cookie';
import { BiSolidRightArrow } from 'react-icons/bi';

import '../../components/Users/storeStyles.css'
const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFilterCategory = (category) => {
    dispatch(filterCategory(category));
    setSelectedCategory(category);
    navigate('/home');
    Cookies.set('selectedCategory', category); // Guarda la categoría seleccionada en las cookies
  };
  const handleAllProducts = () => {
    dispatch(getProducts());
    dispatch(setSearchTerm(''));
    navigate('/home');
    Cookies.remove('selectedCategory'); // Elimina la categoría seleccionada de las cookies
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true
  };

  return (
    <div className='storeComponent'>
      <div className='landingBg md:h-64 flex items-center justify-center'>
        <div>
          <h5 className='fontMarcellus text-wwwhite text-2xl'>Welcome to</h5>
          <img src="https://images2.imgbox.com/d5/e2/K5cFCN47_o.png" alt="Wizarding Wares" className='w-1/3 mx-auto'/>
        </div>
      </div>
      <div>
        <h2 className='uppercase fontMarcellus mt-4'>
          Categorías
        </h2>
      </div>
      <div className='px-24'>
        <Slider {...settings} className='my-4'>
            <div>
              <div className='imgGolosinas flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
                onClick={() => handleFilterCategory('Golosinas')}
              >
                <h5 
                className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'>Golosinas</h5>
              </div>
            </div>
            <div>
              <div className='imgIndumentaria flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Indumentaria')}
              >
                <h5 
                className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'
                >
                  Indumentaria</h5>
            </div>
            </div>
            <div>
              <div className='imgLibros flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Libros')}
              >
                <h5 
                className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'
                >
                  Libros</h5>
              </div>
            </div>
            <div>
              <div className='imgVaritas flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Varitas')}
              >
                <h5 
                className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'
                >
                  Varitas</h5>
              </div>
            </div>
            <div>
              <div className='imgQuidditch flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Quidditch')}
              >
                <h5 
                className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'
                >
                  Quidditch</h5>
              </div>
            </div>
            <div>
              <div className='imgMiscelaneas flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Misceláneas')}
              >
                <h5 
                className='fontMarcellus text-2xl text-wwwhite shadowText font-bold'
                >
                  Misceláneas</h5>
              </div>
            </div>
          </Slider>
      </div>
          <button onClick={() => handleAllProducts()} className='btn1 btn--svg-small mt-4 mb-4'
          >
            Todos los productos</button>
    </div>
  );
};

export default Landing;

