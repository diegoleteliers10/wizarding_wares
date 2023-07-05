import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getProductReviews } from '../../../redux/userSlice'
import { LuStars } from 'react-icons/lu';


const Rating = ({productId}) => {
    const dispatch = useDispatch();
    const productReviews = useSelector((state) => state.user.reviews);
  
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
          index <= roundedAverage
            ? 'text-wwmaroon fill-current'
            : 'text-gray-500';
    
        return <LuStars key={index}  className={starClass} />;
    });
       
 

    return(
        reviewCount > 0? 
        <div className="rating flex items-center">
            <h3 className='flex'>{stars}</h3>
            <p className='mr-8 text-xl'><span className='ml-4'> ({reviewCount}) </span></p>
        </div>
        : null
    )

}


export default Rating