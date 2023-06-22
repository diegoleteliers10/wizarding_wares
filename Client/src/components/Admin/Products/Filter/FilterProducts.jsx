import { BsFilter } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { filterProductCategory, filterStock } from "../../../../redux/adminSlice";

function FilterProducts() {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(filterProductCategory(filter));
  };

  const handleStockChange = (event) => {
    const stock = event.target.value
    //console.log(stock);
    dispatch(filterStock(stock))
    
  };

  return (
    <div>
      <div className={`inline-block`}>
        {/* Filtro categoria */}
        <select
          name="filterCategory"
          id="filterCategory"
          className={`appearance-none bg-white`}
          onChange={handleFilterChange}
        >
          <option value="All">Todas las categorías</option>
          <option value="Golosinas">Golosinas</option>
          <option value="Indumentaria">Indumentaria</option>
          <option value="Libros">Libros</option>
          <option value="Quidditch">Quidditch</option>
          <option value="Varitas">Varitas</option>
          <option value="Misceláneas">Misceláneos</option>
        </select>
      </div>
      <div className="inline-block ml-8">
      <select
          name="filterStock"
          id="filterStock"
          className={`appearance-none bg-white`}
          onChange={handleStockChange}
        >
        <option value="" hidden>Stock</option>
          <option value="All">Todos</option>
          <option value="yes">Con stock</option>
          <option value="no">Sin stock</option>
        </select>
      </div>
    </div>
  );
}

export default FilterProducts;
