import DataDisplay from "../../components/Admin/DataDisplay/DataDisplay";
import SideBar from "../../components/Admin/SideBar/SideBar"
import getCookie from "../../hooks/getCookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {

    const navigate = useNavigate();
    const isAdmin = getCookie('admin');

    useEffect(()=>{
        console.log(isAdmin)
        if(!isAdmin) navigate('/')
    }, [])

    if (!isAdmin) {
        // Si no es admin no se renderiza
        return null;
      }
    
      return (
        <div className="bg-white">
          <div className="flex p-8">
            <SideBar />
            <DataDisplay />
          </div>
        </div>
      );
    };

export default Admin;