import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom' 

const Card = (props) => {
    return (
        props.isActive === true &&
        
            <Cardd style={{ width: '18rem' }}>
                <Link to={`/${props.id}`} className='Link'>
                <img src={props.image} alt='{props.name}'/>
                <h2>{props.name}</h2>
                <h2>{props.price}</h2>
                </Link>
            </Cardd>

    );
}

export default Card;