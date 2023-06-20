const { User, Role } = require("../models/relationship/relationship");
const { arrojarError, validadorDeEmails, validateString, validadorDePassword } = require("../utils/utils");


// *** CREAR UN USUARIO **
const createUserRegister = async (name, email) => {

  // Verificamos si nos pasan argumentos. Si no... Lanzamos un error
  if(!name || !email){
    arrojarError("Parametros Necesarios Inexistentes");
  }

  // Verificamos si name es de tipo string. Si no... Lanzamos un Error
  (typeof name !== "string") && arrojarError("'name' debe contener solo letras del ABC... y espacios");
  (!validateString(name)) && arrojarError("'name' debe contener solo letras del ABC... y espacios");

  // Verificamos Si 'email' es de tipo string y con formato Correo Electronico. Si no... Lanzamos un Error
  const validEmail = (typeof email == "string" && validadorDeEmails(email));
  (!validEmail) && arrojarError("'email' debe tener el formato: 'example@example.com");

  // Verificamos si password, es de tipo de dato string, contenga entre 6 y 20  caracteres, 
  // sea alfanumerico Y Una Letra este En Mayuscula
  // const validPassword = validadorDePassword(password);
  // (!validPassword) && arrojarError("'password', debe ser alfanumerica... tener 'letras y numero', una letra en mayuscula, y tener entre 6 y 20 caracteres");

  // Verificamos si el email ingresado se encuentre en nuestra base de datos.
  const isExistEmail = await User.findOne({
    where:{
      email: email,
    }
  });

  // En caso de que el email ya se encuentre en DB... Lanzamos un error
  (isExistEmail !== null) && arrojarError(`El Email: ${email}. No esta disponible`);

  // *** Esta parte se supone que no llegara al usuario ***
  //------------------------------------------------------*
  const roleId = 2; // Role por defecto entre (admin y user) es user;
  const isExistsRole = await Role.findOne({
    where: {
      roleId: roleId
    }
  });

  // Si el role no existe. Lanzamos un Error
  (isExistsRole == null) && arrojarError("El role no existe");
  //***************************************************** */

  // Caso contrario... Creamos un nuevo usuario
  const newUser = await User.create({name, email});
  newUser.setRole(isExistsRole);
  return newUser;
  // return {
  //   "Perfect": "User successfully created"
  // }
};



// *************************************************************************************************



// *** ELIMINACION DE UN USUARIO ( BORRADO LOGICO )
const logicalUserDeletion = async (userId) => {

  // Verificamos si nos pasan userId. Si no... Lanzamos un Error
  (!userId) && arrojarError("Parametro 'userId' es requerido");

  // Verificamos si userId sea de Tipo De Dato String. Si no... Lanzamos un Error
  (typeof userId !== "string") && arrojarError("'userId' de ser un String");

  // Verificamos si el usuario existe en base de datos. Si no... Lanzamos un Error
  const isExitsUser = await User.findAll({
    where: {
      userId: userId
    }
  });
  (!isExitsUser.length) && arrojarError(`Usuario Con El userId: ${userId}; No existe`);
  
  // Caso contrario procedemos a realizar el borrado logico del usuario
  await User.update({isActive: !isExitsUser[0].isActive}, {
    where: {
      userId: userId
    }
  });

  // return isExitsUser;
  return {
    "Perfect": `User ${isExitsUser[0].name}; Successfully Deleted`
  }
};



module.exports = {
  createUserRegister,
  logicalUserDeletion,
};