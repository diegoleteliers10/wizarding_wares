import { Link } from "react-router-dom"; 

const LandingPage = () => {
    return(
        <div className="landing">
            <Link to="/home" className="button">GO</Link>
        </div>
    )
}

export default LandingPage