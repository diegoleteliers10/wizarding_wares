import Card from '../Card/Card';
import Row from 'react-bootstrap/Row';
import FilterStore from '../FilterStore/FilterStore';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../../redux/userSlice';

const Cards = () => {
    const {allProducts, products} = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(()=>{
        //si el estado global de products no tiene nada aun, dispatch
        // de la accion que trae todos los productos
        !products.length && dispatch(getProducts());
        //console.log(products)
    }, [products])
    return (
        <div>
        <Row xs={1} md={2} className="g-4">
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
                    isActive={product.isActive}
                />
            ))}
        </Row>
        </div>
    );
}

export default Cards;