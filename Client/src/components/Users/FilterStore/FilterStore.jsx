import { useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import { setSearchTerm } from '../../../redux/userSlice';


function FilterStore(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currCategory = useSelector(state => state.user.filterCategory)
  const currPrice = useSelector(state => state.user.filterPrice);
  const currSort = useSelector(state => state.user.sort)
  const {search} = useSelector(state => state.user)
  const categoryName = useSelector(state => state.user.filterCategory) || '';

  useEffect(() => {
    if (currCategory.length > 0) {
      const filterCategoryElement = document.getElementById('filterCategory');
      if (filterCategoryElement) {
        filterCategoryElement.value = currCategory;
      }
    }
    if (currPrice.length > 0) {
      const minPriceElement = document.getElementById('minPrice');
      const maxPriceElement = document.getElementById('maxPrice');
      if (minPriceElement && maxPriceElement) {
        minPriceElement.value = currPrice[0];
        maxPriceElement.value = currPrice[1];
      }
    }
    if (currSort[1] !== 'SortP') {
      const orderByPriceElement = document.getElementById('orderByPrice');
      if (orderByPriceElement) {
        orderByPriceElement.value = currSort[1];
      }
    }
    if (currSort[2] !== 'SortN') {
      const orderByNameElement = document.getElementById('orderByName');
      if (orderByNameElement) {
        orderByNameElement.value = currSort[2];
      }
    }
  }, []);

 
  useEffect(() => {
    if (categoryName === '') {
      const filterCategoryElement = document.getElementById('filterCategory');
      if (filterCategoryElement) {
        filterCategoryElement.value = 'Categoría';
      }
      const orderByPriceElement = document.getElementById('orderByPrice');
      if (orderByPriceElement) {
        orderByPriceElement.value = 'SortP';
      }
      const orderByRatingElement = document.getElementById('orderByRating');
      if (orderByRatingElement) {
        orderByRatingElement.value = 'SortR';
      }
      const orderByNameElement = document.getElementById('orderByName');
      if (orderByNameElement) {
        orderByNameElement.value = 'SortN';
      }
      const minPriceElement = document.getElementById('minPrice');
      if (minPriceElement) {
        minPriceElement.value = '';
      }
      const maxPriceElement = document.getElementById('maxPrice');
      if (maxPriceElement) {
        maxPriceElement.value = '';
      }
    }
  }, [categoryName, search]);
  

  function handleFilterChange(event) {
    const filter = event.target.value;
    dispatch(filterCategory(filter));
  
    // Verificar si el elemento existe antes de establecer su valor
    const orderByPriceElement = document.getElementById('orderByPrice');
    if (orderByPriceElement) {
      orderByPriceElement.value = 'SortP';
    }
  
    const orderByRatingElement = document.getElementById('orderByRating');
    if (orderByRatingElement) {
      orderByRatingElement.value = 'SortR';
    }
  
    const orderByNameElement = document.getElementById('orderByName');
    if (orderByNameElement) {
      orderByNameElement.value = 'SortN';
    }
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
    dispatch(getProducts())
    dispatch(setSearchTerm(''));
    document.getElementById('filterCategory').value = 'Categoría';
    document.getElementById('orderByPrice').value = 'SortP';
    document.getElementById('orderByRating').value = 'SortR';
    document.getElementById('orderByName').value = 'SortN';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
  }
  
  

  return (
    <div className={`mx-auto w-full flex justify-center items-center gap-1 storeComponent mb-4`}>
      {categoryName === '' ? 
      <div className={`inline-block ${styles.filterItem}`}>
        <button className="bg-wwbrown rounded-md hover:bg-wwmaroon transition-all text-wwwhite py-2 px-4" onClick={handleReset}>
          Reset
        </button>
      </div>
      :null
      }
      
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
      {(pathname === '/home' || pathname === 'search') && categoryName === '' && (
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
      {categoryName === '' &&
      <div className={`${styles.dInherit}`}>
      <input type="number" placeholder="Min" className={`p-2 ${styles.bgInput}`} id="minPrice" />
      <input type="number" placeholder="Max" className={`p-2 ${styles.bgInput}`} id="maxPrice" />
      <button className="flex items-center my-auto text-2xl h-1/2" onClick={handlePriceFilter}>
        <TbListSearch/>
      </button>
    </div>}
      
    </div>
  );
}

export default FilterStore;
