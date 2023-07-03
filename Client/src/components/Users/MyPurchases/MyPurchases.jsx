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
    </div>
  );
};

export default MyPurchases;