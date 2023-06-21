import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../storeStyles.css'; 

const Card = (props) => {
    return (
        props.isActive === true &&
        <div className={props.stock === 0 ? 'storeComponentOutOfStock' :'storeComponentCard'}>
            <Cardd>
                <Link to={props.stock === 0 ? "" : `/${props.id}`} className='customLink'>
                <img src={props.image} alt={props.name} title={props.name}/>
                <h2>{props.name}</h2>
                <h2>${props.price}</h2>
                {props.stock === 0 ? <p>Sin stock!</p> : ""}
                </Link>
            </Cardd>
        </div>

    );
}

export default Card;