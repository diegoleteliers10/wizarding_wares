import Cardd from 'react-bootstrap/Card';

const Card = (props) => {
    console.log(props.isActive)
    return (
        props.isActive === true &&
        <Cardd style={{ width: '18rem' }}>
            <img src={props.image} alt=''/>
            <h2>{props.name}</h2>
            <h2>{props.price}</h2>
        </Cardd>
    );
}

export default Card;