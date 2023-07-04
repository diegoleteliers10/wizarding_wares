import Card from '../Card/Card';
import Row from 'react-bootstrap/Row';
import FilterStore from '../FilterStore/FilterStore';
import { useSelector, useDispatch } from 'react-redux';

import '../storeStyles.css'; 
import Paginate from '../Paginate/Paginate';

import { getProducts } from '../../../redux/userSlice';

const Cards = () => {
    const { allProducts, products, filterPrice, filterCategory, search } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const categoryName = filterCategory ? filterCategory : ''; // Obtén el nombre de la categoría seleccionada o 'Todas' si no hay categoría seleccionada.
    const searchTerm = useSelector(state => state.user.searchTerm)

    const page = useSelector((state) => state.user.page);
    const itemsPerPage = 10;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start ,end);

    

    const handleAllProducts = () => {
        dispatch(getProducts());
    };

    return (
        <div className='storeComponent p-8'>
           {searchTerm && (
        <h2 className="fontMarcellus">
          Se muestran resultados de búsqueda de: " {searchTerm} "
        </h2>
      )}
            {categoryName != '' ?
            <h2 className='fontMarcellus'>{categoryName}</h2>
            :null
            }   
            {categoryName != '' ?
                <button onClick={handleAllProducts}><p className='fontMarcellus'>Ver todos los productos</p></button>
                :null
            }
            
            <Row xs={1} md={2} className="g-4">
                <FilterStore/>
            </Row>
            <Row xs={1} md={2} className="g-4 justify-center">
                {pageItems.map((product) => (
                    <Card
                        key={product.productId}
                        id={product.productId}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        isActive={product.isActive}
                    />
                ))}
            </Row>
            <div>
                <Paginate/>
            </div>
            {
                (!products.length && (filterPrice.length || filterCategory || search)) && 
                <div className='noProductos flex items-center justify-center'>
                    <h1>No hay productos disponibles con esos criterios</h1>
                </div>
            }
        </div>
    );
}

export default Cards;
