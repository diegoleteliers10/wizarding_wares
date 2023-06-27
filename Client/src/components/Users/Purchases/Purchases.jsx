const Purchases = () => {
    return(
        <div>
            <img src={props.image} alt={props.name} title={props.name} className='w-32'/>
            <div>
            <h5>{props.name}</h5>
            <p>{productFound.size && `Talle: ${productFound.size}`}</p>
            </div>
        </div>
    )
}

export default Purchases