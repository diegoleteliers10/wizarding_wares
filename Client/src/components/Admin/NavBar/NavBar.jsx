import { useSelector } from "react-redux";
import FilterProducts from "../Products/Filter/FilterProducts";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    const display = useSelector((state) => state.admin.display)
    return (
        <div>
        {display === "productList" && <SearchBar/>}
        {display === "productList" && <FilterProducts/>}
        </div>
    )
}
export default NavBar