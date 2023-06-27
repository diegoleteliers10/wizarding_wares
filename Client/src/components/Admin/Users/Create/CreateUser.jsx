import { useEffect, useState } from "react";
import { displayUsers } from "../../../../redux/adminSlice";
import { createUser } from "../../../../redux/accountSlice";
import { useDispatch,  } from "react-redux"
import PopUp from "../../PopUp/PopUp";
import { BiArrowBack } from "react-icons/bi";

const CreateUser =() =>{
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

    function handleDisplay(){
      dispatch(displayUsers())
    }

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState ({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
    }

    const validate = (input) => {
        let errors = {};
        const { name, email, password, confirmPassword } = input;
        if (!/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
          errors.name = 'Name cannot contain special characters';
        } else if (name.length < 3) {
          errors.name = 'The name must be at least 3 characters long';
        } else if(!email.trim() || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            errors.email = 'Please enter a valid email address'
        } else if(!password.trim() || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)){
            errors.password = 'Password must be at least 6 characters long, contain lowercase and uppercase characters and a number'
        } 
        return errors;
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createUser(input))
        .then(()=>{
            setInput({
                name: "",
                email: "",
                password: "",
            })            
        setPopUpMessage('User created successfully');
        setPopUp(true);
        })
        .catch((error)=>{
            console.log("User creation failed:", error);
        })
      }

      return(
        <div>
            {
            popUp === true && (
              <PopUp trigger={popUp} setTrigger={setPopUp} display='users'>
                <h3>{popUpMessage}</h3>
              </PopUp>
            )}
            <div className="flex justify-center items-center h-screen formContainer">
                <div className="h-screen ml-2 border-2 border-gray-300 rounded py-4 px-20 w-full shadow overflow-y-scroll">
                    <div className="flex">
                    <button className="flex text-purple-600 items-center font-medium mb-2 hover:text-purple-700" onClick={handleDisplay}>
                        <BiArrowBack className="mr-2"/>Back 
                    </button>
                    </div>
                <div className="text-left flex">
                    <form onSubmit={handleSubmit} id="form" className="w-3/4">
                        <h2>User Creation</h2>
                        <div className="formBox">
                        <div className="mb-4 md:mt-6 lg:mt-8">
                            <label htmlFor="name"> 
                            <span>Name</span>
                                <input 
                                type="text" 
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                value={input.name}
                                className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                                required
                                />
                            </label>
                            {errors.name && (<span className="flex text-red-600">{errors.name}</span>)}
                        </div>
                        <div className="mb-4 md:mt-6 lg:mt-8">
                            <label htmlFor="email"> 
                            <span>Email</span>
                                <input 
                                type="email" 
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                value={input.email}
                                className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                                required
                                />
                            </label>
                            {errors.email && (<span className="flex text-red-600">{errors.email}</span>)}
                        </div>
                        <div className="mb-4 md:mt-6 lg:mt-8">
                                <label htmlFor="password">
                                    <span>Password</span>
                                    <input 
                                    type="password" 
                                    name="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    value={input.password}
                                    className="border rounded py-2 px-4 m-2 shadow w-full bg-white"
                                    required
                                    />
                                </label>
                            {errors.password && (<span className="flex text-red-600">{errors.password}</span>)}
                        </div>

                        </div>
                        <div className="boton">
                    <button
                    className="bg-purple-600 rounded hover:bg-purple-700 active:bg-purple-700 focus:outline-2 focus:ring focus:ring-purple-300 w-40 h-10 shadow text-white"
                    type="submit"
                    >
                    Create
                    </button>
                </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
      )
}

export default CreateUser;