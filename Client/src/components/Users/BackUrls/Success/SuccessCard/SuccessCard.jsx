import Cardd from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const SuccessCard = (props) => {

    return (

        <tr key={props.productId} className='btmBorder'>
        <td>
          <div className='flex items-center storeComponent fontEB'>
            <div className='fotoFondoCart mr-4 my-2'>
              <img src={props.image} alt={props.name} title={props.name} className='w-32' />
            </div>
            <div>
              <h5>{props.name}</h5>
              <p className='text-wwbrown'>{props.size && `Talle: ${props.size}`}</p>
            </div>
          </div>
        </td>

        <td>
          <div className='flex items-center fontEB text-center'>
            <div>
              <span className='text-xl'>{props && props.quantity}</span>
            </div>
          </div>
        </td>

        <td className='text-xl fontEB'>${props.price}</td>
      </tr>
       
        // <div className='storeComponent storeComponentCard '>
        //     <Cardd className='pointer-events-none '>
        //         <Link to={`/${props.id}`} className='customLink'>
        //         <div className='fotoFondo'>
        //         <img src={props.image} alt={props.name} title={props.name} className='scale-75'/>
        //         </div>
        //         <h2 className='mt-4 text-2xl'>{props.name}</h2>
        //         <h3 className='text-wwbrown'>Unidad: ${props.price}</h3>
        //         <h3 className='text-wwbrown'>x{props.quantity}</h3>
        //         </Link>
        //     </Cardd>
        // </div>

    );
}

export default SuccessCard;