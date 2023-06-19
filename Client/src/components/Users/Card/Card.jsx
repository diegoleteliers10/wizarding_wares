import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../storeStyles.css'; 

const Card = (props) => {
    return (
        props.isActive === true &&
        <div className='storeComponentCard'>
            <Cardd>
                <Link to={`/${props.id}`} className='customLink'>
                <img src={props.image} alt={props.name} title={props.name}/>
                <h2>{props.name}</h2>
                <h2>${props.price}</h2>
                </Link>
            </Cardd>
        </div>

    );
}

export default Card;