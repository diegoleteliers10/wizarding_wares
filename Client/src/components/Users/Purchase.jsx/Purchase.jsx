import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductReviews } from "../../../redux/userSlice";
import getCookie from "../../../hooks/getCookie";
import '../storeStyles.css';


const Purchase = ({ id, image, name, price, status }) => {
  
    const user = getCookie('userInfo');
    const userId = JSON.parse(user).id;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reviewed, setReviewed] = useState(false)

    const {reviews} = useSelector((state)=> state.user)

  const handleShopNow = () => {
    navigate(`/${id}`);
  };

  const handleReview = () => {
    sessionStorage.setItem("productId", id);
    navigate(`/reviews/${id}`);
  };

 useEffect(() => {
    dispatch(getProductReviews(id));
  }, [id]);

  useEffect(() => {
    //console.log(reviews.reviews);
    if(reviews.reviews && reviews.reviews.length > 0) {
        const userReviewFound = reviews.reviews.find(userReview => userReview.userUserId === userId && userReview.productProductId == id)
        //console.log(name, userReviewFound)
        if(userReviewFound) setReviewed(true)
    }
    //console.log(reviews)
  }, [reviews]);

  return (
    <div className='flex h-1/2 gap-8 items-center'>
      <img src={image} alt={name} title={name} className='w-32' />
      <div>
        <h5>{name}</h5>
      </div>   
      <p>${price}</p>
      <div>
        <button onClick={handleShopNow} className="text-wwbrown hover:text-wwmaroon font-semibold">Volver a comprar</button>
      </div>
      <div>
      <button
  onClick={handleReview}
  disabled={status !== 'Entregado' || reviewed ? 'disabled' : ''}
  className={(status === 'Entregado' && !reviewed) ? `btn1 btn--svg-small` : 'btn1 btn--svg-small pointer-events-none opacity-50'}
>
  Calificar producto
</button>
      </div>
    </div>
  );
};

export default Purchase;