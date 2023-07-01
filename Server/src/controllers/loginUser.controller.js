const User = require('../models/Users.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const Role =  require('../models/Roles.model')
const {generateRandomString} = require('../utils/utils')

const loginUser = async (req, res) => {
  const { email, password, email_verified, name } = req.body;

  try {

    if(email_verified ===true){
      let passGoogle= generateRandomString();
      let salt = await bcrypt.genSalt(10);
      let passEncrypt = await bcrypt.hash(passGoogle, salt);

      let userCreateGoogle = await User.findOrCreate({
        where: { email: email },
        defaults: {
          name: name,
          email: email,
          password: passEncrypt,
        }
      })

      let roleId = 2; // Role por defecto entre (admin y user) es user;
      let isExistsRole = await Role.findOne({
        where: {
          roleId: roleId
        }
      });
    
      //si el usuario que se encuentra tiene role, no se le asigna nada, si se crea el usuario se le asigna
      if(!userCreateGoogle[0].roleRoleId){
        userCreateGoogle[0].setRole(isExistsRole);
      }

      await User.update({verified: true},{  //  <--- Agregue esta linea "KailyKinG"
        where:{
          email: email,
        }
      })

      let tokenGoogle = jwt.sign({userId: userCreateGoogle[0].userId, name: userCreateGoogle[0].name, email: userCreateGoogle[0].email, roleId: userCreateGoogle[0].roleRoleId}, SECRET);

      return res.status(200).json({
        userInfo: {
          name: userCreateGoogle[0].name,
          email: userCreateGoogle[0].email,
          id: userCreateGoogle[0].userId,
          role: userCreateGoogle[0].roleRoleId,
          verified: userCreateGoogle[0].verified,
          token: tokenGoogle
        },
        message: 'Login Successful'
      })
    }else{
      let userFound = await User.findOne({ where: { email: email } });
      let token = jwt.sign({userId: userFound.userId, name: userFound.name, email: userFound.email, roleId: userFound.roleRoleId}, SECRET);
      if (!userFound) {
        //si no lo encuentro retorno error
        return res.status(404).json({ message: 'User not found' });
      }
      if(userFound.isActive === false){
        return res.status(401).json({ message: 'User no longer active' });
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
          verified: userFound.verified,
          token: token
        },
        message: 'Login Successful'
      });
    }
  } catch (error) {
    // si hay error en la peticion
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong with the login, try again.' });
  }
};

module.exports = loginUser;