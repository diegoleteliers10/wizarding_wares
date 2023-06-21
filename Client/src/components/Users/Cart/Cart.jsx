import Cardd from 'react-bootstrap/Card';
const Cart = (props) => {
    return(
        <div className='storeComponentCard'>
            <Cardd>
                <img src={props.image} alt={props.name} title={props.name}/>
                <h2>{props.name}</h2>
                <h2>${props.price}</h2>
            </Cardd>
        </div>
    )
}

export default Cart