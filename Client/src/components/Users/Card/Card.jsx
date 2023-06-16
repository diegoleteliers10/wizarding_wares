import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom' 

const Card = (props) => {
    return (
        <Link to={`/${props.id}`} className='Link'>
            <Cardd style={{ width: '18rem' }}>
                <img src={props.image} alt=''/>
                <h2>{props.name}</h2>
                <h2>{props.price}</h2>
            </Cardd>
        </Link>
    );
}

export default Card;