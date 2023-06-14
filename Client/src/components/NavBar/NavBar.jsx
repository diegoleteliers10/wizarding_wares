import SearchBar from "../SearchBar/SearchBar"


const NavBar = () => {
    return(
         <div>
         <button className="btn btn--svg-small">Home</button>
         <SearchBar/>
         <button className="btn btn--svg-small">Login</button>
         <button className="btn btn--svg-small">Register</button>
        </div>
    )
}

export default NavBar;