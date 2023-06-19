import { useState } from "react";
import { SlMagicWand } from 'react-icons/sl';
import { searchByName } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(searchByName(search));
        setSearch('');
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(searchByName(search));
            setSearch('');
        }
    }

    return (
        <div className="relative">
            <input
                type="text"
                name="search"
                value={search}
                placeholder="Buscar..."
                onChange={event => onChangeHandler(event)}
                onKeyPress={event => handleKeyPress(event)}
                className="bg-white pr-12 pl-4 py-2 rounded"
            />

            <button
                type="submit"
                onClick={(event) => submitHandler(event)}
                className="absolute right-0 top-0 h-full w-12 flex items-center justify-center"
            >
                <SlMagicWand className="transform scale-x-[-1]" />
            </button>
        </div>
    )
}

export default SearchBar;