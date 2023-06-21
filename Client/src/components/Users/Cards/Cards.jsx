import Card from '../Card/Card';
import Row from 'react-bootstrap/Row';
import FilterStore from '../FilterStore/FilterStore';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../../redux/userSlice';
import '../storeStyles.css'; 

const Cards = () => {
    const {allProducts, products, filterPrice, filterCategory, search} = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(()=>{
        //si el estado global de products no tiene nada aun, dispatch
        // de la accion que trae todos los productos
        (!products.length && !filterPrice.length && !filterCategory && !search) && dispatch(getProducts());
        //console.log(products)
    }, [products])
    return (
        <div className='storeComponent'>
        <Row xs={1} md={2} className="g-4 my-4">
            <FilterStore/>
        </Row>
        <Row xs={1} md={2} className="g-4 justify-center">
            {products.map((product) => (
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