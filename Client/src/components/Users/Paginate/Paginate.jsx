import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../../redux/userSlice"
import "../../../index.css"

const Paginate = () => {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.user.page);
    const products = useSelector((state) => state.user.products);
    const totalPages = products.length / 10;

    const handleChange = (pageNumber) => {
        dispatch(changePage(pageNumber));
    }

    return (
        <div className="paginate">
            { page > 1 ? 
                <>
                    <button onClick={() => handleChange(page - 1)}>🡸</button>
                    <label className="prev">{page - 1}</label>
                </> 
             : null
            }
            <label className="in">{page}</label>
            { page < totalPages ? 
                <>
                    <label className="next">{page + 1}</label>
                    <button onClick={() => handleChange(page + 1)}>🡺</button>
                </> 
             : null
            }
        </div>
    )
}

export default Paginate