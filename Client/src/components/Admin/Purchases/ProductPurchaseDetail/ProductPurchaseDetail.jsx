const ProductPurchaseDetail = ({product})=>{
console.log(product)
return(
    <tr>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td className="text-center">${product.price}</td>
    </tr>
    
)
}
export default ProductPurchaseDetail;