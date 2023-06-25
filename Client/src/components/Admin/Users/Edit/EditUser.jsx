import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayUsers, editUserData, editUserRole } from "../../../../redux/adminSlice";
import PopUp from "../../PopUp/PopUp";

const EditUser = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.admin.edit);
    console.log(user);  

    const [input, setInput] = useState({
      userId: user.userId,
      name: user.name,
      email: user.email,
      roleId: user.roleRoleId,
    }); 


    const [popUp, setPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    const handleChange = (event) => {
      setInput({
           ...input, [event.target.name]: event.target.value 
          });
    };  

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await dispatch(editUserRole(input));
        await dispatch(editUserData(input));
        setPopUpMessage('User edited successfully');
        setPopUp(true);
        setTimeout(() => { 
          dispatch(displayUsers());
        }, 2000); // Delay the execution for 2 seconds
      } catch (error) {
        console.log("Error al actualizar el usuario:", error);
      }
    };  

    console.log("popUp state:", popUp);

    return (
      <div>
         {
      
            popUp === true && (
              <PopUp trigger={popUp} setTrigger={setPopUp}>
                <h3>{popUpMessage}</h3>
              </PopUp>
        )}
        <form onSubmit={handleSubmit}>
          <div className="formBox flex">
            <div className="mb-4 md:mt-6  lg:mt-8 flex-grow">
              <label>
                <span>Name</span>
                <input
                  className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={input.name}
                  required
                />
              </label>
            </div>  
            <div className="mb-4 md:mt-6 lg:mt-8 flex-grow">
              <label>
                <span>Email</span>
                <input
                  className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={input.email}
                  required
                />
              </label>
            </div>  
            <div className="mb-4 md:mt-6 lg:mt-8 flex-grow">
              <label>
                <span>Role Id</span>
                <input
                  className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                  name="roleId"
                  type="number"
                  min={1}
                  max={2}
                  onChange={handleChange}
                  value={input.roleId}
                  required
                />
              </label>
            </div>
          </div>
          <button
          type="submit"
          >Confirm edit</button>
        </form>
      </div>
    );
};

export default EditUser;