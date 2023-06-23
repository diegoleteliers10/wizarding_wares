import { BsFilter } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { 
  filterProductCategory, 
  filterStock, 
  sortByNameAscending,
  sortByNameDescending,
  sortByPriceAscending,
  sortByPriceDescending,
  getProducts,
} from "../../../../redux/adminSlice";
import { useEffect } from "react";


function FilterProducts() {
  const dispatch = useDispatch();
  const {filterCategory, sort} = useSelector(state => state.admin)
  const stock = useSelector((state)=> state.admin.filterStock)

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(filterProductCategory(filter));
  };

  const handleStockChange = (event) => {
    const stock = event.target.value
    //console.log(stock);
    dispatch(filterStock(stock))
    
  };

  const handleReset = ()=>{
    dispatch(getProducts());
    document.getElementById('filterCategory').value = 'All';
    document.getElementById('filterStock').value = 'Stock';
    document.getElementById('orderByPrice').value = 'SortP';
    document.getElementById('orderByName').value = 'SortN';
  }

  function handleSortChange(event) {
    const sort = event.target.value;
    if (sort === 'nameAscending') {
      dispatch(sortByNameAscending());
      document.getElementById('orderByPrice').value = 'SortP';
    }else if(sort === 'nameDescending'){
      dispatch(sortByNameDescending());
      document.getElementById('orderByPrice').value = 'SortP';
    }else if(sort === 'priceHighToLow'){
      dispatch(sortByPriceAscending())
      document.getElementById('orderByName').value = 'SortN';
    }else if(sort === 'priceLowToHigh'){
      dispatch(sortByPriceDescending())
      document.getElementById('orderByName').value = 'SortN';
    }
  }
  useEffect(()=>{
    if(filterCategory) document.getElementById('filterCategory').value = filterCategory;
    if(stock) document.getElementById('filterStock').value = stock;
    if(sort.includes('price')){
      document.getElementById('orderByPrice').value = sort;
    } 
    if(sort.includes('name')){
      document.getElementById('orderByName').value = sort;
    }    
  }, [])


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
        <option value="Stock" hidden>Stock</option>
          <option value="All">Todos</option>
          <option value="yes">Con stock</option>
          <option value="no">Sin stock</option>
        </select>
      </div>
      <div className="inline-block">
        {/* Orden por precio */}
        <select
          name="orderByPrice"
          id="orderByPrice"
          className='appearance-none bg-white' // Use the imported class name
          onChange={handleSortChange}
        >
          <option value="SortP" hidden>
            Precio
          </option>
          <option value="priceHighToLow">Mayor precio</option>
          <option value="priceLowToHigh">Menor precio</option>
        </select>
      </div>
      <div className={`inline-block`}>
        {/* Orden por nombre */}
        <select
          name="orderByName"
          id="orderByName"
          className='appearance-none bg-white'
          onChange={handleSortChange}
        >
          <option value="SortN" hidden>
            Orden
          </option>
          <option value="nameAscending">Nombre (A-Z)</option>
          <option value="nameDescending">Nombre (Z-A)</option>
        </select>
      </div>
      <div className="inline-block">
        <button className="button bg-red" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default FilterProducts;
