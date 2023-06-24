const User = require('../models/Users.model')
const bcrypt = require("bcrypt");

const loginUser = async (req,res)=>{
  const {email, password, email_verified} = req.body
  try {
    const userFound= await User.findOne({
      where: {
        email:email
      }
    })

    //encriptado de contraseña, para compararla con la encriptacion que tiene el password en la db
    const salt = await bcrypt.genSalt(10);
    const passEncrypt = await bcrypt.hash(password, salt);


    if(userFound){ //si encuentra el usuario, que entre al if

      if(userFound.password && userFound.password===passEncrypt){

        res.status(200).json({userInfo:{name:userFound.name,email:userFound.email,id:userFound.id,role:userFound.role},message:"Login Successful"})
      };
      
      if(!userFound.password && email_verified===true){
        res.status(200).json({userInfo:{name:userFound.name,email:userFound.email,id:userFound.id,role:userFound.role},message:"Login Successful"})
      }

    }else{
      res.status(404).json({message:"User not found"})
    }
    
  } catch (error) {
    res.status(500).json({message:"Something went wrong with the login, try again."})
  }
}

module.exports= loginUser;