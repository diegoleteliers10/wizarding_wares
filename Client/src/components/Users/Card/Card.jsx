import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom' 

const Card = (props) => {
    console.log(props.isActive)
    return (

        <Link to={`/${props.id}`} className='Link'>
            <Cardd style={{ width: '18rem' }}>
                <img src={props.image} alt=''/>
                <h2>{props.name}</h2>
                <h2>{props.price}</h2>
            </Cardd>
        </Link>

        props.isActive === true &&
        <Cardd style={{ width: '18rem' }}>
            <img src={props.image} alt=''/>
            <h2>{props.name}</h2>
            <h2>{props.price}</h2>
        </Cardd>

    );
}

export default Card;