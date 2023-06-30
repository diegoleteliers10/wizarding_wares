const User = require('../models/Users.model');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { email, password, email_verified } = req.body;

  try {

    //busco el usuario con el email
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound) {
      //si no lo encuentro retorno error
      return res.status(404).json({ message: 'User not found' });
    }
    if(userFound.isActive === false){
      return res.status(401).json({ message: 'User no longer active' });
    }
    //si encuentra usuario y ademas recibe propiedad email verified en true, permito acceso
    if (email_verified === true) {
      await User.update({verified: true},{  //  <--- Agregue esta linea "KailyKinG"
        where:{
          email: email,
        }
      });
      return res.status(200).json({
        userInfo: {
          name: userFound.name,
          email: userFound.email,
          id: userFound.userId,
          role: userFound.roleRoleId,
          
        },
        message: 'Login Successful'
      });
    }
    // if(userFound.verified == false){   // <--- Esta linea es mia "KailyKinG", Pero mi intencion es que el message, se muestre emn login en caso de no verificacion
    //   return res.status(401).json({message: "Account not verified"});
    // }
    if (userFound.password) {
      // si en vez de email verified recibio password, la encripto y comparo con la guardada en la DB
      const isPasswordValid = await bcrypt.compare(password, userFound.password);

      if (!isPasswordValid) {
        // si la password es incorrecta,  devuelve error
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
    //si la password es correcta, devuelvo info de usuario
    return res.status(200).json({
      userInfo: {
        name: userFound.name,
        email: userFound.email,
        id: userFound.userId,
        role: userFound.roleRoleId,
        verified: userFound.verified
      },
      message: 'Login Successful'
    });
  } catch (error) {
    // si hay error en la peticion
    return res.status(500).json({ message: 'Something went wrong with the login, try again.' });
  }
};

module.exports = loginUser;