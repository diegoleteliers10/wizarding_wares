import SuccessCard from "../SuccessCard/SuccessCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCookie from "../../../../../hooks/getCookie";
import { getUserAddress, createPurchase } from "../../../../../redux/userSlice";

const Success = () => {
    
    const {userAddress} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const userInfoUnparsed = getCookie('userInfo')
    const [order, setOrder] = useState()
    const [userId, setUserId] = useState()
    
    
    useEffect(() => {
        if(userInfoUnparsed){
            const userInfo = JSON.parse(userInfoUnparsed)
            const userId = userInfo.id
            setUserId(userId)
           
        } 
    }, [userInfoUnparsed])
    
    useEffect(() => {
        if(userId){
         dispatch(getUserAddress(userId))
        }
    },[userId])


    useEffect(() => {
        if(userAddress && userId){
            const addressId = userAddress?.addresses?.[0]?.User_Address?.addressAddressId;
            const shoppingCartProducts = localStorage.getItem('shoppingCart')
            let parsedProducts = []
            parsedProducts = JSON.parse(shoppingCartProducts);
            
            const order = parsedProducts.map(product => ({
                name: product.name,
                productId: product.productId,
                image: product.image,
                price: Number(product.price),
                quantity: Number(product.quantity)
            }))
            
            setOrder(order)
            
            const purchase = {
                userId: userId,
                addressId: addressId,
                purchaseItems: order
            }
            console.log(addressId);
            console.log(userAddress);
            console.log('esto es el purchase', purchase);
            dispatch(createPurchase(purchase))
        }
    }, [userAddress, userId])
    

    return( 
        <div>
            <h2>La compra fue exitosa!</h2> 

            
            {order?.map((product) => (
                <SuccessCard
                    key = {product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    totalPrice= "TotalPrice: ???"
                />
            ))}
            <span>Total: {"precio total"}</span>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Volver al home</a>
                <a href="#" className="text-sm font-semibold text-gray-900">Ir a compras <span aria-hidden="true">&rarr;</span></a>
            </div>
        </div>
    )
}

export default Success;