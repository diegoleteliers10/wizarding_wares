import {RxCaretLeft} from "react-icons/rx"
import '../storeStyles.css'; 
import { useNavigate } from "react-router-dom";


function BackButton() {
    const navigate = useNavigate()

    const handleGoHome = ()=> {
        navigate('/')
    }
    return (
      <div className="buttonContainer">
        <button onClick={handleGoHome}>
          <RxCaretLeft />
        </button>
        <div className="square"></div>
      </div>
    );
  }
  
  export default BackButton;