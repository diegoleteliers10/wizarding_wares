const { User } = require("../models/relationship/relationship");
const { arrojarError, validadorDeEmails, validateString, validadorDePassword } = require("../utils/utils");


// *** CREAR UN USUARIO **
const createUserRegister = async (name, email, password) => {

  // Verificamos si nos pasan argumentos. Si no... Lanzamos un error
  if(!name || !email || !password){
    arrojarError("Parametros Necesarios Inexistentes");
  }

  // Verificamos si name es de tipo string. Si no... Lanzamos un Error
  (typeof name !== "string") && arrojarError("'name' debe contener solo letras del ABC... y espacios");
  (!validateString(name)) && arrojarError("'name' debe contener solo letras del ABC... y espacios");

  // Verificamos Si 'email' es de tipo string y con formato Correo Electronico. Si no... Lanzamos un Error
  const validEmail = (typeof email == "string" && validadorDeEmails(email));
  !validEmail && arrojarError("'email' debe tener el formato: 'example@example.com");

  // Verificamos si password, es de tipo de dato string, contenga entre 6 y 20  caracteres, 
  // sea alfanumerico Y Una Letra este En Mayuscula
  const validPassword = validadorDePassword(password);
  (!validPassword) && arrojarError("'password', debe ser alfanumerica... tener 'letras y numero', una letra en mayuscula, y tener entre 6 y 20 caracteres");

  // Verificamos si el email ingresado se encuentre en nuestra base de datos.
  const isExistEmail = await User.findOne({
    where:{
      email: email,
    }
  });

  // En caso de que el email ya se encuentre en DB... Lanzamos un error
  (isExistEmail !== null) && arrojarError(`El Email: ${email}. No esta disponible`);


  // Caso contrario... Creamos un nuevo usuario
  const newUser = await User.create({name, email, password});
  return newUser;
  // return {
  //   "Perfect": "User successfully created"
  // }
};



module.exports = {
  createUserRegister,
};