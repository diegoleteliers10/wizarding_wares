import { useNavigate } from "react-router"

const Purchase = (props) => {
    const navigate = useNavigate();

    const handleShopNow = () => {
        navigate(`/${props.id}`)
    }

    return(
        <div className='flex h-1/2 gap-8 items-center'>
        <img src={props.image} alt={props.name} title={props.name} className='w-32'/>
        <div>
        <h5>{props.name}</h5>
        </div>   
        <p>${props.price}</p>
        <p>{props.status}</p>
        <div>
            <button onClick={()=>handleShopNow()}>Volver a comprar</button>
        </div>
        <div>
            <button>Calificar producto</button>
        </div>
    </div>
    )
}

export default Purchase