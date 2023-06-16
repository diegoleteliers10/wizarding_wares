import { useLocation } from "react-router-dom";
import { RxCaretSort } from 'react-icons/rx';
import styles from "./FilterStore.module.css"; // Import the module CSS file

function FilterStore(props) {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className={`mx-auto ${styles.filterContainer}`}>
      <div className={`inline-block ${styles.filterItem}`}>
        {/* Orden por calificacion */}
        {/* <RxCaretSort /> */}
        <select
          name="orderByRating"
          id="orderByRating"
          className={`bg-white ${styles.customSelect}`} // Use the imported class name
        >
          <option value="" hidden>
            Calificación
          </option>
          <option value="rateHighToLow">Mejor puntuación</option>
          <option value="rateLowToHigh">Peor puntuación</option>
        </select>
      </div>
      {
        (pathname === 'allProducts' || pathname === 'search') && (
          <div className={`inline-block ${styles.filterItem}`}>
            {/* Filtro categoria */}
            <select
              name="filterCategory"
              id="filterCategory"
              className={`bg-white ${styles.customSelect}`} // Use the imported class name
            >
              <option value="" hidden>
                Categoría
              </option>
              <option value="Golosinas">Golosinas</option>
              <option value="Indumentaria">Indumentaria</option>
              <option value="Quidditch">Quidditch</option>
              <option value="Varitas">Varitas</option>
              <option value="Miscelaneas">Misceláneos</option>
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
          <option value="" hidden>
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
          <option value="" hidden>Orden</option>
          <option value="nameAscending">Ascendente</option>
          <option value="nameDescending">Descendente</option>
        </select>
      </div>
      <div className={`inline-block ${styles.filterItem}`}>
        <p>Rango de precio</p>
        <input type="number" placeholder="Min" className="bg-white" />
        <input type="number" placeholder="Max" className="bg-white" />
      </div>
    </div>
  );
}

export default FilterStore;