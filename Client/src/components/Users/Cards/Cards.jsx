import Card from '../Card/Card';
import data from '../../../assets/data.json';
import Row from 'react-bootstrap/Row';

const Cards = () => {
    return (
        <Row xs={1} md={2} className="g-4">
            {data.map((product) => (
                <Card
                    key={product.productId}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </Row>
    );
}

export default Cards;