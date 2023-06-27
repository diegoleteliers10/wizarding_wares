import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const SuccessCard = (props) => {

    return (
       
        <div className='storeComponent storeComponentCard'>
            <Cardd className='pointer-events-none '>
                <Link to={`/${props.id}`} className='customLink'>
                <div className='fotoFondo'>
                <img src={props.image} alt={props.name} title={props.name} className='scale-75'/>
                </div>
                <h2 className='mt-4 text-2xl'>{props.name}</h2>
                <h3 className='text-wwbrown'>Unidad: ${props.price}</h3>
                <h3 className='text-wwbrown'>x{props.quantity}</h3>
                </Link>
            </Cardd>
        </div>

    );
}

export default SuccessCard;