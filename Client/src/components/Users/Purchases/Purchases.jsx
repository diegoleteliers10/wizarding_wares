import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Purchase from "../Purchase.jsx/Purchase";
import { useEffect } from "react";
import { getPurchases } from "../../../redux/userSlice";
import getCookie from "../../../hooks/getCookie";
import "../storeStyles.css";

const Purchases = ({ id, date, status, products }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // dispatch(getPurchases(userId));
  }, []);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }

  function sumPrices(items) {
    let total = 0;
  
    items.forEach((product) => {
      total += product.price;
    });
  
    return total;
  }

  return (
    <div className="storeComponent ">
      <div className="w-1/2 mt-4 flex">
        <div className="w-1/2">
            <h4 className="text-left fontEB">Compra del {formatDate(date)}</h4>
            <p className="text-left fontEB">Estado: {status}</p>
            <button className="toggleButton flex justify-start mb-4 font-semibold fontEB text-wwmaroon" onClick={handleToggle}>
            {isExpanded ? `Esconder productos (${products.length})` : `Ver productos (${products.length})`}
            </button>
        </div>
        <div className="w-1/2 flex items-center justify-end mr-4">
            <h5>Total ${sumPrices(products)}</h5>
        </div>
      </div>
        <div className="btmBorder w-1/2">
            {isExpanded && (
            <div>
                {products?.map((product) => (
                <Purchase
                    key={product.productId}
                    id={product.productId}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    status={status}
                />
                ))}
            </div>
            )}
            
        </div>
    </div>
  );
};

export default Purchases;