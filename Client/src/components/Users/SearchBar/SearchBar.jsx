import { useState } from "react";

const SearchBar = () => {

    const [name, setName] = useState('');

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        //dispatch => getProductByName 
        setName('')
    }

    return (
        <div>
            <input
                type="text"
                name="search"
                value= {name} 
                placeholder="Buscar..."
                onChange={event => onChangeHandler(event)}
            />

            <button
                type="submit"
                onClick={(event) => submitHandler(event)}
            >
                Buscar
            </button>
        </div>
    )

}

export default SearchBar;