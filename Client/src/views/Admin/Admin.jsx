import ProductList from "../../components/Admin/Products/ProductList/ProductList";
import SideBar from "../../components/Admin/SideBar/SideBar"

const Admin = () => {
    return(
        <div>
             <div className="flex">
             <SideBar/>
             <ProductList/>
             </div>
        </div>
    )
}

export default Admin;