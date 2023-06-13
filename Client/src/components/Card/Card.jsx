const Card = (props) => {
    return (
        <div>
            <img src={props.image} alt=''/>
            <h2>{props.name}</h2>
            <h2>{props.price}</h2>
        </div>
    );
}

export default Card;