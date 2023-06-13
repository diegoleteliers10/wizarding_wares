import Card from '../Card/Card';
import data from '../../assets/data.json';

const Cards = () => {
    return (
        <div>
            {data.map((product) => (
                <Card
                    key={product.productId}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </div>
    );
}

export default Cards;