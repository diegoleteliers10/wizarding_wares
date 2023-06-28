import { useDispatch, useSelector } from "react-redux";
import Purchase from "../Purchase.jsx/Purchase";
import { useEffect } from "react";
import { getPurchases } from "../../../redux/userSlice";
import getCookie from "../../../hooks/getCookie";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.user.purchases);
  const products = purchases.length > 0 ? purchases[0].products : [];
  const status = purchases.length > 0 ? purchases[0].status.name : "";
  const user = getCookie('userInfo');
  const userId = JSON.parse(user).id;


  useEffect(() => {
    dispatch(getPurchases(userId));
  }, []);

  return (
    <div>
      {products.map((purchase) => (
        <Purchase
          key={purchase.name}
          id={purchase.productId}
          image={purchase.image}
          name={purchase.name}
          price={purchase.price}
          status={status}
        />
      ))}
    </div>
  );
};

export default Purchases;