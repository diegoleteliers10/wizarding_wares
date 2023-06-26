import { useSelector } from "react-redux";
function TotalPrice() {

    const {price} = useSelector((state)=> state.user)
    const cartItems = localStorage.getItem('shoppingCart')
    let shoppingCart =[];
    if(cartItems){
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    }

  // Calcular precio total
  let totalPrice = 0;
  for (const item of shoppingCart) {
    totalPrice += item.price * item.quantity;
  }

  // actualizar precio total en carrito
  const updatedShoppingCart = shoppingCart.map((item) => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));

  // actualizar carrito en localstorage
  localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart));

  // Return del precio total
  return totalPrice;
}

export default TotalPrice;