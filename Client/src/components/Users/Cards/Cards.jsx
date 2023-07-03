import Card from '../Card/Card';
import Row from 'react-bootstrap/Row';
import FilterStore from '../FilterStore/FilterStore';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../../redux/userSlice';
import '../storeStyles.css'; 
import Paginate from '../Paginate/Paginate';

const Cards = () => {
    const {allProducts, products, filterPrice, filterCategory, search} = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(()=>{
        //si el estado global de products no tiene nada aun, dispatch
        // de la accion que trae todos los productos
        (!products.length && !filterPrice.length && !filterCategory && !search) && dispatch(getProducts());
    }, [products])

    const page = useSelector((state) => state.user.page);
    const itemsPerPage = 10;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start ,end)

    return (
        <div className='storeComponent p-8'>
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