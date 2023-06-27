import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayUsers, editUserData, editUserRole } from "../../../../redux/adminSlice";
import PopUp from "../../PopUp/PopUp";
import { BiArrowBack } from "react-icons/bi";

const EditUser = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.admin.edit);
    //console.log(user);  

    const [input, setInput] = useState({
      userId: user.userId,
      name: user.name,
      email: user.email,
      roleId: user.roleRoleId,
    }); 

    const [errors, setErrors] = useState ({
      name: "",
      email: "",
  })


    const [popUp, setPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    const handleChange = (event) => {
      setInput({
           ...input, [event.target.name]: event.target.value 
          });
      setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
        console.log(errors)
    };  

    const validate = (input) => {
      let errors = {};
      const { name, email } = input;
      if (!/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
        errors.name = 'El nombre no puede contener carácteres especiales';
      } else if (name.length < 3) {
        errors.name = 'El nombre debe tener al menos tres letras de longitud!';
      } else if(!email.trim() || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          errors.email = 'La dirección de email es incorrecta'
      } 
      return errors;
    };


    function handleDisplay(){
      dispatch(displayUsers())
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (Object.keys(errors).length === 0) {
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
      }
    };

    //console.log("popUp state:", popUp);

    return (
      <div>
         {
      
            popUp === true && (
              <PopUp trigger={popUp} setTrigger={setPopUp}>
                <h3>{popUpMessage}</h3>
              </PopUp>
        )}
        <div className="flex justify-center items-center h-screen">
          <div className="h-screen ml-2 border-2 border-gray-300 rounded py-4 px-20 w-full shadow overflow-y-scroll">
          <div className="flex">
              <button className="flex text-purple-600 items-center font-medium mb-2 hover:text-purple-700" onClick={handleDisplay}>
                <BiArrowBack className="mr-2"/>Back 
              </button>
          </div>
          <div className="text-left">
          <h2>Edit <span className="">"{user.name}"</span></h2>
            <form onSubmit={handleSubmit}>
              <div className="formBox">
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
                <div>
                  {
                    errors.name && <p className="text-red-600">{errors.name}</p>
                  }
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
                  <div>
                  {
                    errors.email && <p className="text-red-600">{errors.email}</p>
                  }
                </div>
                </div>  
                <div className="mb-4 md:mt-6 lg:mt-8 grid">
                  <label>
                    <span>Role Id</span>
                  </label>
                    {/* <input
                      className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                      name="roleId"
                      type="number"
                      min={1}
                      max={2}
                      onChange={handleChange}
                      value={input.roleId}
                      required
                    /> */}
                    <select name="roleId" id="role" defaultValue={input.roleId} className="appearance-none bg-white border rounded py-2 px-4 m-2 shadow w-1/5" onChange={handleChange}>
                      <option value={1} className="w-1/5">Admin</option>
                      <option value={2} className="w-1/5">User</option>
                    </select>
                </div>
              </div>
              <button
              type="submit"
              className="bg-purple-600 rounded hover:bg-purple-700 active:bg-purple-700 focus:outline-2 focus:ring focus:ring-purple-300 w-40 h-10 shadow text-white"
              >Confirm edit</button>
            </form>

          </div>
          </div>
        </div>
      </div>
    );
};

export default EditUser;