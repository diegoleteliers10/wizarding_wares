import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProductReview } from '../../../redux/userSlice';
import { LuStars } from 'react-icons/lu';
import getCookie from "../../../hooks/getCookie";
import '../storeStyles.css';

const ReviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);

  const user = getCookie('userInfo');
  const userId = JSON.parse(user).id;

  const productId = sessionStorage.getItem('productId');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProductReview({ productId, userId, comment, rating}));
    setComment('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className='mt-4 fontMarcellus'>Cuéntanos qué te parecio el producto:</h3>
        <h5 className='fontEB'>¡Tu opinión nos ayuda a mejorar!</h5>
        <div className="mb-4 storeComponent">
        <label htmlFor="rating" className="block mb-2 mt-4 fontMarcellus text-xl">
          Calificación:
        </label>
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <LuStars
              key={value}
              className={
                value <= rating ? 'fill-current text-wwmaroon text-3xl' : 'text-gray-500 cursor-pointer text-3xl'
              }
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>
      </div>

        <label htmlFor="comment" className="block mt-4 mb-2 fontMarcellus text-xl">
          Comentario:
        </label>
        <textarea
          id="comment"
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg bg-white fontEB"
          rows="3"
          value={comment}
          placeholder= 'Ej: Me encantó este producto!!'
          onChange={handleCommentChange}
          required
        />
      </div>

      
      <button
        type="submit"
        className="btn1 btn--svg-small"
      >
        Enviar
      </button>
    </form>
  );
};

export default ReviewForm;
