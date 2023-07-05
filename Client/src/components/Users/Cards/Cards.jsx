import Card from '../Card/Card';
import Row from 'react-bootstrap/Row';
import FilterStore from '../FilterStore/FilterStore';
import { useSelector, useDispatch } from 'react-redux';
import '../storeStyles.css'; 
import Paginate from '../Paginate/Paginate';
import { getProducts, filterCategory } from '../../../redux/userSlice';
import { useEffect } from 'react';
import getCookie from '../../../hooks/getCookie';

const Cards = () => {
    const { allProducts, products, filterPrice, search } = useSelector(state => state.user);
    const filterCat = useSelector(state=> state.user.filterCategory)
    const dispatch = useDispatch();
    const categoryName = filterCat ? filterCat : ''; // Obtén el nombre de la categoría seleccionada o 'Todas' si no hay categoría seleccionada.
    const searchTerm = useSelector(state => state.user.searchTerm)

    const page = useSelector((state) => state.user.page);
    const itemsPerPage = 10;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start ,end);

    const selectedCategory = getCookie('selectedCategory')

    const handleAllProducts = () => {
        dispatch(getProducts());
    };

    useEffect(()=>{
        //console.log(selectedCategory)
        if(selectedCategory) {
            dispatch(filterCategory(selectedCategory))
        } else if (searchTerm){
            return;
        }
        dispatch(getProducts());
        
    }, [])

    return (
        <div className='storeComponent p-8'>
           {searchTerm && (
            <div>
                <h2 className="fontMarcellus mb-2">
                  Se muestran resultados de búsqueda de: " {searchTerm} "
                </h2>
                <p className='fontMarcellus mb-4'> Ver <span className='hover:text-wwmaroon transition-all ease-in underline cursor-pointer' onClick={handleAllProducts}>todos los productos</span></p>
            </div>
      )}
            {categoryName != '' ?
            <h2 className='fontMarcellus'>{categoryName}</h2>
            :null
            }   
            {categoryName != '' ?
                <button onClick={handleAllProducts}><p className='fontMarcellus  mb-4'>
                    Ver <span className='hover:text-wwmaroon transition-all ease-in underline'>todos los productos</span></p>
                </button>
                :null
            }
            {
                !categoryName && !searchTerm &&
                <h2 className="fontMarcellus mb-8">
                    Todos los productos
                </h2>
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
                (!products.length && (filterPrice.length || filterCat || search)) && 
                <div className='noProductos flex items-center justify-center'>
                    <div>
                        <img src="https://images.squarespace-cdn.com/content/v1/54c7a830e4b00cfd22a54116/1571387566581-FZH215MDB0CDO716TS6J/measuredbuildingsurvey.jpg" alt="Varita rota" className='mix-blend-multiply w-60 mx-auto scale-x-[-1]'/>
                        <h3 className='fontMarcellus'>No hay productos disponibles con esos criterios</h3>

                    </div>
                </div>
            }
        </div>
    );
}

export default Cards;
