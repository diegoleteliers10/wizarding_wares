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
    const [user, setUser] = useState({
        name: "",
        email: "", 
    });
    const [address, setAddress] = useState({
        street: "",
        number: "",
        detail: "",
        zipCode: "",
    });
    const navigate = useNavigate();

    //para poder obtener el total del precio
    let shoppingCartProducts = localStorage.getItem('shoppingCart');
    let parsedProducts = [];
    parsedProducts = JSON.parse(shoppingCartProducts);

    let totalPrice = parsedProducts.reduce((acc, product) => {
        return acc + Number(product.price) * Number(product.quantity);
    }, 0);

    useEffect(() => {
        if (userInfoUnparsed) {
            const userInfo = JSON.parse(userInfoUnparsed);
            const userId = userInfo.id;
            setUserId(userId);
            setUser({
                name: userInfo.name,
                email: userInfo.email
            })
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
            setAddress({
                ...address,
                street: userAddress?.addresses?.[0]?.street,
                number: userAddress?.addresses?.[0]?.number,
                detail: userAddress?.addresses?.[0]?.detail, 
                zipCode: userAddress?.addresses?.[0]?.zipCode,
            })  

            const order = parsedProducts.map(product => ({
                name: product.name,
                productId: product.productId,
                image: product.image,
                price: Number(product.price),
                quantity: Number(product.quantity),
                size: product.size
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
            dispatch(createPurchase(purchase));
        }
    }, [userAddress, userId,]);

    return (
        <div className="p-4">
            
            <h2>La compra fue exitosa!</h2>

            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="no-underline rounded-md bg-amber-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={()=>{
                    localStorage.setItem('shoppingCart', [''])
                    navigate('/');
                }}>Volver al home</a>
                <a href="#" className="no-underline text-sm font-semibold text-gray-900" onClick={()=>{
                    localStorage.setItem('shoppingCart', [''])
                    navigate('/purchases')
                }}>Ir a compras <span aria-hidden="true">&rarr;</span></a>
            </div>

            <div className="p-5  text-left flex">


                <div className="w-2/3">
                    <h3>Tus productos: </h3>
                    <table className='w-2/3 text-left mt-8'>
                  <thead>
                    <tr className='btmBorder'>
                      <th className='fontMarcellus uppercase'>Productos</th>
                      <th className='fontMarcellus uppercase'>Cantidad</th>
                      <th className='fontMarcellus uppercase'>Precio</th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {myOrder?.map((product) => (
                        <SuccessCard
                            key={product.productId}
                            id={product.productId}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                            size= {product.size}
                        />
                    ))}
                  </tbody>
                
                </table>
                    

                </div>


                <div className="w-1/3">     
                    <div className="p-6">

                    <h3>Detalles de la entrega</h3>

                        <div className="mt-2">
                            <span>Calle: </span>
                            <span>{address.street}</span>
                        </div>

                        <div>
                            <span>Número: </span>
                            <span>{address.number}</span>
                        </div>

                        <div>
                            <span>Detalle: </span>
                            <span>{address.detail}</span>
                        </div>

                        <div>
                            <span>Código postal : </span>
                            <span>{address.zipCode}</span>
                        </div>

                    </div>

                    <div className="p-6 mt-10">

                            <h3>Detalles del usuario</h3>

                            <div className="mt-2">
                                <span>Nombre: </span>
                                <span>{user.name}</span>
                            </div>

                            <div>
                                <span>Email: </span>
                                <span>{user.email}</span>
                            </div>

                    </div>
                </div>  

            
            

        </div>        
            <h4 className="mt-4">Total: ${totalPrice}</h4>

            {/* {myOrder?.length >= 4 && 
            //Back to top
            </div>
            } */}
        </div>
    );
}

export default Success;