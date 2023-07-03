import ProductPurchaseDetail from "../ProductPurchaseDetail/ProductPurchaseDetail";

const PurchaseDetail = (props)=>{

    const {products, purchaseId} = props;
    console.log(products)
    function sumPrices(items) {
        let total = 0;
      
        items.forEach((product) => {
          total += product.price;
        });
      
        return total;
      }
return(
    <div>
        <h2>Detail purchase "{purchaseId}"</h2>
        <table className={`w-full`}>
            <thead>
                <tr className=''>
                    <th className='p-4'>Product</th>
                    <th className='p-4 text-center'>Description</th>
                    <th className='p-4 text-center'>Price</th>
                    
                </tr>
            </thead>
            <tbody>
                {products?.map((product)=>(
                    <ProductPurchaseDetail key={product.productId} product={product}/>
                ))}
            </tbody>
        </table>
        <div>
            <h6 className="text-end mt-4 mr-4">Total price: ${sumPrices(products)}</h6>
        </div>
    </div>
)
}
export default PurchaseDetail;