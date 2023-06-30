import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getProductReviews } from '../../../redux/userSlice'
import { LuStars } from 'react-icons/lu';


const Rating = ({productId}) => {
    const dispatch = useDispatch();
    const productReviews = useSelector((state) => state.user.reviews);
    console.log(productReviews);
  
    // const productId = sessionStorage.getItem('productId');
    // const rating = productReviews.reviews?.map((review) => {
    //     review.rating
    // })

    useEffect(() => {
        dispatch(getProductReviews(productId));
    }, [dispatch, productId]);


    const ratings = productReviews.reviews?.map((review) => review.rating) || [];
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;
    const roundedAverage = Math.round(average);
    const reviewCount = ratings.length;
    
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starClass =
          index < roundedAverage
            ? 'text-black-400'
            : 'text-gray-500 text-xl fill-current ';
    
        return <LuStars key={index}  className={starClass} />;
    });
       
 

    return(
        reviewCount > 0? 
        <div className="rating">
            <h3>{stars}</h3>
            <p>({reviewCount})</p>
        </div>
        : null
    )

}


export default Rating