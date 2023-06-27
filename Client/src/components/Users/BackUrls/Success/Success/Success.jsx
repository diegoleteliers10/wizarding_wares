import SuccessCard from "../SuccessCard/SuccessCard";


const Success = () => {
    
    const shoppingCartProducts = localStorage.getItem('shoppingCart')
    let parsedProducts = []
    parsedProducts = JSON.parse(shoppingCartProducts);
      
    const order = parsedProducts.map(product => ({
        name: product.name,
        id: product.productId,
        image: product.image,
        price: Number(product.price),
        quantity: Number(product.quantity)
    }))

    
    return( 
        <div>
            <h2>La compra fue exitosa!</h2> 

            
            {order?.map((product) => (
                <SuccessCard
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    totalPrice= "TotalPrice: ???"
                />
            ))}
            <span>Total: {"precio total"}</span>
            
            <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Volver al home</a>
                <a href="#" class="text-sm font-semibold text-gray-900">Ir a compras <span aria-hidden="true">&rarr;</span></a>
            </div>
        </div>
    )
}

export default Success;