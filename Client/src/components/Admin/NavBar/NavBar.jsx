import { useSelector } from "react-redux";
import FilterProducts from "../Products/Filter/FilterProducts";
import FilterUsers from "../Users/FilterUsers/FilterUsers";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    const display = useSelector((state) => state.admin.display)
    return (
        <div>
        {display === "productList" && <SearchBar/>}
        {display === "productList" && <FilterProducts/>}
        {display === "users" && <FilterUsers/>}
        </div>
    )
}
export default NavBar