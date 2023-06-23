import { useState } from "react";
import { useSelector } from "react-redux";

const EditUser = () => {

    const editUser = useSelector((state) => state.admin.editUser)

    const [input, setInput] = useState({
        email: editUser.name,
        role: editUser.role,
    });

    return(
        
        <div>
            Aca entra el form para editar
        </div>

)
}

export default EditUser;