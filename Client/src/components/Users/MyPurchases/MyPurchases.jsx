import { useDispatch, useSelector } from "react-redux";
import Purchase from "../Purchase.jsx/Purchase";
import Purchases from "../Purchases/Purchases";
import { useEffect } from "react";
import { getPurchases } from "../../../redux/userSlice";
import getCookie from "../../../hooks/getCookie";
import '../storeStyles.css';

const MyPurchases = () => {
  const dispatch = useDispatch();
  const {purchases} = useSelector((state) => state.user);
  const user = getCookie('userInfo');
  const userId = JSON.parse(user).id;


  useEffect(() => {
    dispatch(getPurchases(userId));
  }, []);

  return (
    <div className="p-4 mx-auto">
      <h2 className="fontMarcellus mt-4">Mis compras</h2>
      { 
        purchases?.map((purchase)=>(
          <Purchases
            key={purchase.purchaseId}
            id={purchase.purchaseId}
            date={purchase.createdAt}
            status={purchase.status.name}
            products={purchase.products}
          />
        ))
      }
      {
        !purchases.length &&
        <div>
          <img className="mx-auto w-40" src="https://harrypottershop.co.uk/cdn/shop/products/Gringotts_Bank_Three_Coin_Box006_800x.png?v=1679956785" alt="" />
          <h4 className="fontEB italic">No has realizado ninguna compra aún</h4>
        </div>
      }
    </div>
  );
};

export default MyPurchases;