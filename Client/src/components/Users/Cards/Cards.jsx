import Card from '../Card/Card';
import data from '../../../assets/data.json';
import Row from 'react-bootstrap/Row';
import FilterStore from '../FilterStore/FilterStore';

const Cards = () => {
    return (
        <div>
        <Row xs={1} md={2} className="g-4">
            <FilterStore/>
        </Row>
        <Row xs={1} md={2} className="g-4 justify-center">
            {data.map((product) => (
                <Card
                    key={product.productId}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </Row>
        </div>
    );
}

export default Cards;