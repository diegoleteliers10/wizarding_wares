import { useLocation } from "react-router-dom";
import { startTransition, useEffect } from "react";
import { TbListSearch } from 'react-icons/tb';
import styles from "./FilterStore.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategory,
  getProducts,
  filterPrice,
  sortByNameAscending,
  sortByNameDescending,
  sortByPriceAscending,
  sortByPriceDescending,
} from '../../../redux/userSlice';
import '../storeStyles.css'; 


function FilterStore(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currCategory = useSelector(state => state.user.filterCategory)
  const currPrice = useSelector(state => state.user.filterPrice);
  const currSort = useSelector(state => state.user.sort)
  const {search} = useSelector(state => state.user)
  //console.log(pathname);

  useEffect(()=> {
    if(currCategory) document.getElementById('filterCategory').value = currCategory;
    if(currPrice.length){
      console.log(currPrice)
       document.getElementById('minPrice').value = currPrice[0];
       document.getElementById('maxPrice').value = currPrice[1];
    }
    if(currSort[1] !== 'SortP') document.getElementById('orderByPrice').value = currSort[1];
    if(currSort[2] !== 'SortN') document.getElementById('orderByName').value = currSort[2];
  }, [])

  useEffect(()=>{
    // cuando se hace una search se resetean todos los filtros
    document.getElementById('filterCategory').value = 'Categoría';
    document.getElementById('orderByPrice').value = 'SortP';
    document.getElementById('orderByRating').value = 'SortR';
    document.getElementById('orderByName').value = 'SortN';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
  }, [search])

  function handleFilterChange(event) {
    const filter = event.target.value;
      dispatch(filterCategory(filter));
      document.getElementById('orderByPrice').value = 'SortP';
    document.getElementById('orderByRating').value = 'SortR';
    document.getElementById('orderByName').value = 'SortN';
  }
  function handleSortChange(event) {
    const sort = event.target.value;
    if (sort === 'nameAscending') {
      dispatch(sortByNameAscending());
  }else if(sort === 'nameDescending'){
    dispatch(sortByNameDescending())
  }else if(sort === 'priceHighToLow'){
    dispatch(sortByPriceAscending())
  }else if(sort === 'priceLowToHigh'){
    dispatch(sortByPriceDescending())
  }
}
  function handlePriceFilter() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    if (parseInt(minPrice) >= parseInt(maxPrice) || parseInt(maxPrice) <= parseInt(minPrice)) {
      alert('Revise los valores');
      return;
    }

    dispatch(filterPrice([minPrice, maxPrice]));
  }

  function handleReset() {
    dispatch(getProducts());
    document.getElementById('filterCategory').value = 'Categoría';
    document.getElementById('orderByPrice').value = 'SortP';
    document.getElementById('orderByRating').value = 'SortR';
    document.getElementById('orderByName').value = 'SortN';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
  }

  return (
    <div className={`mx-auto w-full flex justify-center items-center gap-1 storeComponent mb-4`}>
      <div className={`inline-block ${styles.filterItem}`}>
        <button className="bg-wwbrown rounded-md hover:bg-wwmaroon transition-all text-wwwhite py-2 px-4" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className={`hidden ${styles.filterItem}`}>
        {/* Orden por calificacion */}
        {/* <RxCaretSort /> */}
        <select
          name="orderByRating"
          id="orderByRating"
          className={`bg-white appearance-none ${styles.customSelect}`} // Use the imported class name
        >
          <option value="SortR" hidden>
            Calificación ↕️
          </option>
          <option value="rateHighToLow">Mejor puntuación</option>
          <option value="rateLowToHigh">Peor puntuación</option>
        </select>
      </div>
      {(pathname === '/home' || pathname === 'search') && (
        <div className={`inline-block appearance-none ${styles.filterItem}`}>
          {/* Filtro categoria */}
          <select
            name="filterCategory"
            id="filterCategory"
            className={`bg-transparent text-center border-none appearance-none ${styles.customSelect}`}
            onChange={handleFilterChange}
          >
            <option value="Categoría" hidden>
              Categoría ↕️
            </option>
            <option value="Golosinas">Golosinas</option>
            <option value="Indumentaria">Indumentaria</option>
            <option value="Libros">Libros</option>
            <option value="Quidditch">Quidditch</option>
            <option value="Varitas">Varitas</option>
            <option value="Misceláneas">Misceláneos</option>
          </select>
        </div>
      )}
      <div className={`inline-block appearance-none ${styles.filterItem}`}>
        {/* Orden por precio */}
        <select
          name="orderByPrice"
          id="orderByPrice"
          className={`bg-transparent text-center border-none appearance-none ${styles.customSelect}`} // Use the imported class name
          onChange={handleSortChange}
        >
          <option value="SortP" hidden>
            Precio ↕️
          </option>
          <option value="priceHighToLow">Mayor precio</option>
          <option value="priceLowToHigh">Menor precio</option>
        </select>
      </div>
      <div className={`inline-block appearance-none ${styles.filterItem}`}>
        {/* Orden por nombre */}
        <select
          name="orderByName"
          id="orderByName"
          className={`bg-transparent text-center border-none appearance-none my-auto ${styles.customSelect}`} // Use the imported class name
          onChange={handleSortChange}
        >
          <option value="SortN" hidden>
            Orden ↕️
          </option>          
          <option value="nameAscending">Nombre (A-Z)</option>
          <option value="nameDescending">Nombre (Z-A)</option>
        </select>
      </div>
      
      <div className={`${styles.dInherit}`}>
        <input type="number" placeholder="Min" className={`p-2 ${styles.bgInput}`} id="minPrice" />
        <input type="number" placeholder="Max" className={`p-2 ${styles.bgInput}`} id="maxPrice" />
        <button className="flex items-center my-auto text-2xl h-1/2" onClick={handlePriceFilter}>
          <TbListSearch/>
        </button>
      </div>
    </div>
  );
}

export default FilterStore;