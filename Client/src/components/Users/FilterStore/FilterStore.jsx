import { useLocation } from "react-router-dom";
import { RxCaretSort } from 'react-icons/rx';
import styles from "./FilterStore.module.css";
import { useDispatch } from "react-redux";
import { filterCategory, getProducts, filterPrice } from "../../../redux/userSlice";

function FilterStore(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  //console.log(pathname);

  function handleFilterChange(event){
    const filter = event.target.value;
    console.log(filter)
    dispatch(filterCategory(filter))
  }

  function handlePriceFilter(){
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    dispatch(filterPrice([minPrice, maxPrice]))
  }

  function handleReset(){
    dispatch(getProducts())
    document.getElementById('filterCategory').value = "Categoría";
    document.getElementById('orderByPrice').value = "Precio";
    document.getElementById('orderByRating').value = "Calificación";
    document.getElementById('orderByName').value = "Orden"    
  }

  

  return (
    <div className={`mx-auto flex justify-center ${styles.filterContainer}`}>
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
      {
        (pathname === '/' || pathname === 'search') && (
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
        )
      }
      <div className={`inline-block ${styles.filterItem}`}>
        {/* Orden por precio */}
        <select
          name="orderByPrice"
          id="orderByPrice"
          className={`bg-white ${styles.customSelect}`} // Use the imported class name
        >
          <option value="Precio" hidden>
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
        >
          <option value="Orden" hidden>Orden</option>
          <option value="nameAscending">Ascendente</option>
          <option value="nameDescending">Descendente</option>
        </select>
      </div>
      <div className={`${styles.dInherit}`}>
        <input type="number" placeholder="Min" className="bg-white" id="minPrice"/>
        <input type="number" placeholder="Max" className="bg-white" id="maxPrice"/>
        <button onClick={handlePriceFilter}>Buscar</button>
      </div>
      <div className={`inline-block ${styles.filterItem}`}>
        <button onClick={handleReset}>Borrar filtros</button>
      </div>
    </div>
  );
}

export default FilterStore;