import { useState } from "react";
import { SlMagnifier } from 'react-icons/sl';
import { searchByName, searchUserByName } from "../../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const appliedFilters = useSelector(state => state.filters); // Supongamos que los filtros están almacenados en el estado global
    const {display} = useSelector(state => state.admin)

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(display === 'productList') dispatch(searchByName(search, appliedFilters)); // Pasamos los filtros al realizar la búsqueda
        if(display === 'users') dispatch(searchUserByName(search, appliedFilters));
        setSearch('');
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if(display === 'productList') dispatch(searchByName(search, appliedFilters)); // Pasamos los filtros al realizar la búsqueda
            if(display === 'users') dispatch(searchUserByName(search, appliedFilters));
            setSearch('');
        }
    }

    return (
        <div className="relative">
            <input
                type="text"
                name="search"
                value={search}
                placeholder={display === 'productList' ? "Search products..." : "Search users..."}
                onChange={event => onChangeHandler(event)}
                onKeyPress={event => handleKeyPress(event)}
                className="bg-white pr-12 pl-4 py-2 rounded"
            />

            <button
                type="submit"
                onClick={(event) => submitHandler(event)}
            >
                <SlMagnifier className="transform scale-x-[-1]" />
            </button>
        </div>
    )
}

export default SearchBar;