import { useLocation } from 'react-router-dom';
import { RxCaretSort } from 'react-icons/rx';
import styles from './FilterStore.module.css';
import { useDispatch } from 'react-redux';
import {
  filterCategory,
  getProducts,
  filterPrice,
  sortByNameAscending,
  sortByNameDescending,
  sortByPriceAscending,
  sortByPriceDescending,
} from '../../../redux/userSlice';

function FilterStore(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  function handleFilterChange(event) {
    const filter = event.target.value;
      dispatch(filterCategory(filter));
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
    document.getElementById('orderByPrice').value = 'Precio';
    document.getElementById('orderByRating').value = 'Calificación';
    document.getElementById('orderByName').value = 'Orden';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
  }

  return (
    <div className={`mx-auto flex justify-center ${styles.filterContainer}`}>
      <div className={`inline-block ${styles.filterItem}`}>
        <button className="bg-red-100 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className={`inline-block ${styles.filterItem}`}>
        {/* Orden por calificacion */}
        {/* <RxCaretSort /> */}
        <select
          name="orderByRating"
          id="orderByRating"
          className={`bg-white ${styles.customSelect}`} // Use the imported class name
        >
          <option value="Calificación" hidden>
            Calificación
          </option>
          <option value="rateHighToLow">Mejor puntuación</option>
          <option value="rateLowToHigh">Peor puntuación</option>
        </select>
      </div>
      {(pathname === '/' || pathname === 'search') && (
        <div className={`inline-block ${styles.filterItem}`}>
          {/* Filtro categoria */}
          <select
            name="filterCategory"
            id="filterCategory"
            className={`bg-white ${styles.customSelect}`}
            onChange={handleFilterChange}
          >
            <option value="Categoría" hidden>
              Categoría
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
      <div className={`inline-block ${styles.filterItem}`}>
        {/* Orden por precio */}
        <select
          name="orderByPrice"
          id="orderByPrice"
          className={`bg-white ${styles.customSelect}`} // Use the imported class name
          onChange={handleSortChange}
        >
          <option value="Sort" hidden>
            Precio
          </option>
          <option value="priceHighToLow">Mayor precio</option>
          <option value="priceLowToHigh">Menor precio</option>
        </select>
      </div>
      <div className={`inline-block ${styles.filterItem}`}>
        {/* Orden por nombre */}
        <select
          name="orderByName"
          id="orderByName"
          className={`bg-white ${styles.customSelect}`} // Use the imported class name
          onChange={handleSortChange}
        >
          <option value="Sort" hidden>
            Orden
          </option>
          <option value="nameAscending">Nombre (A-Z)</option>
          <option value="nameDescending">Nombre (Z-A)</option>
        </select>
      </div>
      <div className={`${styles.dInherit}`}>
        <input type="number" placeholder="Min" className="bg-white" id="minPrice" />
        <input type="number" placeholder="Max" className="bg-white" id="maxPrice" />
        <button className="bg-gray-100 h-1/2" onClick={handlePriceFilter}>
          Buscar
        </button>
      </div>
    </div>
  );
}

export default FilterStore;