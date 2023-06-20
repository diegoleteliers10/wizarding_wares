import DataDisplay from "../../components/Admin/DataDisplay/DataDisplay";
import SideBar from "../../components/Admin/SideBar/SideBar"

const Admin = () => {
    return(
        <div>
             <div className="flex p-8">
             <SideBar/>
             <DataDisplay/>
             </div>
        </div>
    )
}

export default Admin;