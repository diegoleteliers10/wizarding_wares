import { useSelector } from "react-redux";
import ProductList from "../Products/ProductList/ProductList";
import CreateProduct from "../Products/Create/CreateProduct";
import CreateUser from "../Users/Create/CreateUser";
import EditProduct from "../Products/Edit/EditProduct";
import NavBar from "../NavBar/NavBar";
import UserList from "../Users/UsersList/UsersList";
import EditUser from "../Users/Edit/EditUser";

const DataDisplay = ()=> {

    const display = useSelector((state) => state.admin.display)

return(
    <div className="w-5/6  bg-white">
        {display === "productList" && <NavBar/>}
        {display === "productList" && <ProductList/>}
        {display === "createProduct" && <CreateProduct/>}
        {display === "createUser" && <CreateUser/>}
        {display === "editProduct" && <EditProduct/>}
        {display === "users" && <UserList/>}
        {display === "editUser" && <EditUser/>}
    </div>
)
}
export default DataDisplay;