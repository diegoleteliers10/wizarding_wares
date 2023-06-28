const ProductPurchaseDetail = ({product})=>{
console.log(product)
return(
    <tr>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
    </tr>
    
)
}
export default ProductPurchaseDetail;