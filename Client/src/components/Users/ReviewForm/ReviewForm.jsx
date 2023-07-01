import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProductReview } from '../../../redux/userSlice';
import { LuStars } from 'react-icons/lu';
import getCookie from "../../../hooks/getCookie";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

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
        <label htmlFor="comment" className="block mb-2">
          Comentario:
        </label>
        <textarea
          id="comment"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          rows="3"
          value={comment}
          placeholder= 'Ej: Me encantó este producto!!'
          onChange={handleCommentChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rating" className="block mb-2">
          Calificación:
        </label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <LuStars
              key={value}
              className={
                value <= rating ? 'text-black-400 text-xl' : 'fill-current text-gray-500 cursor-pointer'
              }
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default ReviewForm;
