import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductReviews } from '../../../redux/userSlice';
import { LuStars } from 'react-icons/lu';
import { GiMagicBroom } from 'react-icons/gi';

import '../storeStyles.css';

const ReviewList = ({productId}) => {
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.user.reviews);
  const loading = useSelector((state) => state.user.loading);
  
  
  // const productId = sessionStorage.getItem('productId');
  const reviews = productReviews.reviews || [];
  const reviewCount = reviews.length;

  useEffect(() => {
    dispatch(getProductReviews(productId));
    //console.log(reviews)
  }, [dispatch, productId]);

  if (loading) {
    return <div>Cargando reviews...</div>;
  }
  
  return (
    reviews.length > 0?
    <div className='-mt-20 btmBorder text-center px-10 md:px-44 md:text-left'>
      <div>
        <h3 className='fontMarcellus text-left font-bold text-2xl md:text-4xl mb-2 md:mb-8'>Reviews ({reviewCount})</h3>
      </div>
      {reviews.map((review, index) => (
        <div key={index}>
          <div className='flex items-baseline'>
          <h6 className='fontEB text-xl md:text-2xl'>{review.user.name}</h6>
            <div className='flex justify-center ml-4 text-2xl'>
              {[...Array(5)].map((_, starIndex) => {
                const starClass =
                  starIndex > review.rating ? 'text-gray-500' : 'fill-current text-wwmaroon';
                return <LuStars key={starIndex} className={starClass} />;
              })}
            </div>
          </div>
          <div className='flex w-1/2'>
            <p className='text-lg'>{review.comment}</p>
          </div>
          <div className='btmBorder w-1/2 mb-4'>

          </div>
          
          
        </div>
      ))}
    </div>
    : 
    <div className='-mt-20 btmBorder text-center px-10 md:px-44 md:text-left  mb-8 border-none'>
      
      <h5 className='flex fontMarcellus text-left text-wwmaroon opacity-80'><GiMagicBroom className='mr-2'/>El producto aún no ha sido calificado </h5>
    </div>
  );
};

export default ReviewList;