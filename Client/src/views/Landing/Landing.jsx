import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState,useEffect } from 'react';
import { filterCategory, getProducts } from '../../redux/userSlice';
import Slider from "react-slick";
import { BiSolidRightArrow } from 'react-icons/bi';

import '../../components/Users/storeStyles.css'
const Landing = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Define the media query
    const mediaQuery = window.matchMedia('(max-width: 868px)');

    // Function to handle the media query change
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add event listener to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Initial check for the media query
    setIsMobile(mediaQuery.matches);

    // Clean up the event listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
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

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: 'drop-shadow(2px 4px 6px black)' }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", filter: 'drop-shadow(2px 4px 6px black)' }}
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
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 868,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 571,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
  };

  return (
    <div className='storeComponent'>
      <div className='landingBg h-36 md:h-64 flex items-center justify-center'>
        <div>
          <h5 className='fontMarcellus text-wwwhite text-lg md:text-2xl'>Bienvenido a</h5>
          <img src="https://images2.imgbox.com/d5/e2/K5cFCN47_o.png" alt="Wizarding Wares" className=' mx-auto'/>
        </div>
      </div>
      
      <div>
        <h2 className='uppercase fontMarcellus mt-4'>
          Categorías
        </h2>
      </div>
      <div className='px-10 lg:px-24'>
        <Slider {...settings} className='md:my-4'>
            <div>
              <div className='imgTodos flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
                onClick={() => handleAllProducts()}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold max-w-min'>Todos los productos</h5>
              </div>
            </div>
            <div>
              <div className='imgGolosinas flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
                onClick={() => handleFilterCategory('Golosinas')}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold'>Golosinas</h5>
              </div>
            </div>
            <div>
              <div className='imgIndumentaria flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Indumentaria')}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold'
                >
                  Indumentaria</h5>
            </div>
            </div>
            <div>
              <div className='imgLibros flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Libros')}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold'
                >
                  Libros</h5>
              </div>
            </div>
            <div>
              <div className='imgVaritas flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Varitas')}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold'
                >
                  Varitas</h5>
              </div>
            </div>
            <div>
              <div className='imgQuidditch flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Quidditch')}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold'
                >
                  Quidditch</h5>
              </div>
            </div>
            <div>
              <div className='imgMiscelaneas flex items-center justify-center hover:saturate-50 hover:scale-105 hover:cursor-pointer transition-all ease-in'
              onClick={() => handleFilterCategory('Misceláneas')}
              >
                <h5 
                className='fontMarcellus text-lg sm:text-2xl text-wwwhite shadowText font-bold'
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

