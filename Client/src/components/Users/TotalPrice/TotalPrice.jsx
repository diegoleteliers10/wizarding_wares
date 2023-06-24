import { useSelector } from "react-redux";
function TotalPrice() {

    const {price} = useSelector((state)=> state.user)
    
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

  // Calculate the total price
  let totalPrice = 0;
  for (const item of shoppingCart) {
    totalPrice += item.price * item.quantity;
  }

  // Update the total price in the shopping cart
  const updatedShoppingCart = shoppingCart.map((item) => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));

  // Update the shopping cart in local storage
  localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart));

  // Return the total price
  return totalPrice;
}

export default TotalPrice;