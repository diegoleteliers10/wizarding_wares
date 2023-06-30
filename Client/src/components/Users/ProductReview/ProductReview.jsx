import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductReviews } from '../../../redux/userSlice';
import { LuStars } from 'react-icons/lu';

const ReviewList = () => {
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.user.reviews);
  const loading = useSelector((state) => state.user.loading);
  
  const productId = sessionStorage.getItem('productId');
  const reviews = productReviews.reviews || [];
  const reviewCount = reviews.length;

  useEffect(() => {
    dispatch(getProductReviews(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <div>Cargando reviews...</div>;
  }
  
  return (
    <div>
      <div>
        <p>Reviews: {reviewCount}</p>
      </div>
      {reviews.map((review, index) => (
        <div key={index}>
          <div>
            {[...Array(5)].map((_, starIndex) => {
              const starClass =
                starIndex > review.rating ? 'text-gray-500 fill-current' : 'text-black-400  text-xl';
              return <LuStars key={starIndex} className={starClass} />;
            })}
          </div>
          <p>Comentario: {review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
