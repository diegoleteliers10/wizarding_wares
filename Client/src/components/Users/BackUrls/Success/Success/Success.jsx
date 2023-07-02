import SuccessCard from "../SuccessCard/SuccessCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCookie from "../../../../../hooks/getCookie";
import { getUserAddress, createPurchase } from "../../../../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const { userAddress } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userInfoUnparsed = getCookie('userInfo');
    const [myOrder, setOrder] = useState();
    const [userId, setUserId] = useState();
    const navigate = useNavigate();

    //para poder obtener el total del precio
    let shoppingCartProducts = localStorage.getItem('shoppingCart');
    let parsedProducts = [];
    parsedProducts = JSON.parse(shoppingCartProducts);
    console.log(parsedProducts);

    let totalPrice = parsedProducts.reduce((acc, product) => {
        return acc + Number(product.price) * Number(product.quantity);
    }, 0);

    useEffect(() => {
        if (userInfoUnparsed) {
            const userInfo = JSON.parse(userInfoUnparsed);
            const userId = userInfo.id;
            setUserId(userId);
        }
    }, [userInfoUnparsed]);

    useEffect(() => {
        if (userId) {
            dispatch(getUserAddress(userId));
        }
    }, [userId]);

    useEffect(() => {
        if (userAddress && userId) {
            const addressId = userAddress?.addresses?.[0]?.User_Address?.addressAddressId;
            // const shoppingCartProducts = localStorage.getItem('shoppingCart');
            // let parsedProducts = [];
            // parsedProducts = JSON.parse(shoppingCartProducts);
            // console.log(parsedProducts);

            const order = parsedProducts.map(product => ({
                name: product.name,
                productId: product.productId,
                image: product.image,
                price: Number(product.price),
                quantity: Number(product.quantity)
            }));

            
            //si es que el parsedProduct tiene productos se setean, si es que no, no lo hace
            if (parsedProducts.length > 0) {
                setOrder(order);
            }
            

            const purchase = {
                userId: userId,
                addressId: addressId,
                purchaseItems: order
            };
            console.log(addressId);
            console.log(userAddress);
            console.log('esto es el purchase', purchase);
            dispatch(createPurchase(purchase));
        }
    }, [userAddress, userId]);

    return (
        <div>
            <h2>La compra fue exitosa!</h2>

            {myOrder?.map((product) => (
                <SuccessCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                />
            ))}
            <span>Total: ${totalPrice}</span>

            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={()=>{
                    localStorage.setItem('shoppingCart', [''])
                    navigate('/');
                }}>Volver al home</a>
                <a href="#" className="text-sm font-semibold text-gray-900" onClick={()=>{
                    localStorage.setItem('shoppingCart', [''])
                    navigate('/purchases')
                }}>Ir a compras <span aria-hidden="true">&rarr;</span></a>
            </div>
        </div>
    );
}

export default Success;