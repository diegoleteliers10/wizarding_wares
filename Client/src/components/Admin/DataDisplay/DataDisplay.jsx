import { useSelector } from "react-redux";
import ProductList from "../Products/ProductList/ProductList";
import CreateProduct from "../Products/Create/CreateProduct";
import EditProduct from "../Products/Edit/EditProduct";
import FilterProducts from "../Products/Filter/FilterProducts";

const DataDisplay = ()=> {

    const display = useSelector((state) => state.admin.display)

return(
    <div className="w-5/6 bg-white">
        {display === "productList" && <FilterProducts/>}
        {display === "productList" && <ProductList/>}
        {display === "createProduct" && <CreateProduct/>}
        {display === "editProduct" && <EditProduct/>}
    </div>
)
}
export default DataDisplay;