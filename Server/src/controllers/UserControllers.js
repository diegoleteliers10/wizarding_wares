const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models/relationship/relationship");
const { arrojarError, validadorDeEmails, validateString, validadorDePassword } = require("../utils/utils");
const {SECRET} = process.env;


// *** CREAR UN USUARIO **
const createUserRegister = async (name, email, password) => {

  // Verificamos si nos pasan argumentos. Si no... Lanzamos un error
  if(!name || !email || !password){
    arrojarError("Campos name, email y password; Son Requeridos");
  }

  // Verificamos si name es de tipo string. Si no... Lanzamos un Error
  (typeof name !== "string") && arrojarError("'name' debe contener solo letras del ABC... y espacios");
  (!validateString(name)) && arrojarError("'name' debe contener solo letras del ABC... y espacios");

  // Verificamos Si 'email' es de tipo string y con formato Correo Electronico. Si no... Lanzamos un Error
  const validEmail = (typeof email == "string" && validadorDeEmails(email));
  (!validEmail) && arrojarError("'email' debe tener el formato: 'example@example.com");

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
  (isExistEmail !== null)&& arrojarError(`El Email: ${email}. No esta disponible`);

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
  //---------------------------------------------------------*

  // Encriptamos la password
  const salt = await bcrypt.genSalt(10);
  const passEncrypt = await bcrypt.hash(password, salt);

  // Caso contrario... Creamos un nuevo usuario
  const newUser = await User.create({name, email, password: passEncrypt});
  newUser.setRole(isExistsRole);

  // Generamos el token
  const token = jwt.sign({userId: newUser.userId, name, email, roleId}, SECRET);

  // return newUser;
  // return {
  //   token: token
  // };
  return {
    "Perfect": `User ${newUser.name}; successfully created`
  }
};



// *************************************************************************************************


// *** EDITAR UN USUARIO ***
const updateUser = async (name, email, password, userId) => {
  let updateUser;

  // Verificamos si nos pasan userId. Si no... Lanzamos un Error
  (!userId) && arrojarError("userId es requerido");  

  // Verificamos si el usuario existe. Si no... Lanzamos un Error
  const isExistsUser = await User.findAll({
    where: {
      userId: userId
    }
  });

  (!isExistsUser.length) && arrojarError("Cuenta no existe");  

  // Verificamos si nos pasan name y email. Si no... lanzamos un Error
  (!name && !email && !password) && arrojarError("Campos name, email y password Son Requeridos");

  // Si recibimos name
  if(name){
    // Verificamos si name es de tipo de dato string y si solo contenga Letras del ABC... y Espacios. Si no... Lanzamos un Error
    const validName = (typeof name == "string" && validateString(name));
    (!validName) && arrojarError("Campo name, debe estar conformado solo por letras y espacios");

    // Actualizamos name
    (name) && (await User.update({name: name},{where:{userId:userId}}));
  } 

  // Si recibimos email
  if(email){
    // Verificamos si email es de tipo de dato string y con formato Correo Electronico. Si no... Lanzamos un Error
    const validEmail = (typeof email == "string" && validadorDeEmails(email));
    (!validEmail) && arrojarError("'email' debe tener el formato: 'example@example.com");

    // Actualizamos email
    (email) && (await User.update({email: email},{where:{userId:userId}}));
  }

  // Si recibimos password
  if(password){
    // Verificamos si password es de tipo de dato string y cumpla con los requisitos
    // Sea alfanumerica ( Letras y Numeros ), tenga entre 6 y 20 caracteres y como minimo tenga una letra en Mayuscula
    const validPassword = (typeof password == "string" && validadorDePassword(password));
    (!validPassword) && arrojarError("password de ser alfanumerica ( Letras y Numeros ), tener entre 6 y 20 caracteres y como minimo una letra en Mayuscula"); 


    // Encriptamos la concreseña nueva
    const salt = await bcrypt.genSalt(10);
    const passEncrypt = await bcrypt.hash(password, salt);

    // Actualizamos password
    (password) && await User.update({password: passEncrypt},{where:{userId:userId}});
  }

  // Buscamos el usuario actualizado
  updateUser = await User.findAll({where:{userId:userId}});

  // return updateUser[0];
  return {"Perfect" : `User ${updateUser[0].name}; Successfully Updated`};
  // return;
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
  updateUser,
  logicalUserDeletion,
};