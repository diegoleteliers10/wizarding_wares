const { User, Role } = require("../models/relationship/relationship");
const {arrojarError} = require("../utils/utils");
const {enviarNotificacion, enviarEmail} = require("../utils/notificaciones");
const {diasSemana} = require("../utils/fechas");
const {EMAIL_CREDENTIALS} = process.env;



// *** CAMBIAR EL ROLE DEL USUARIO ***
const updateRoleUser = async (roleId, userId) => {
  
  // Verificamos si nos pasan los argumentos roleId y userId. Si no... Lanzamos un Error
  (!roleId || !userId) && arrojarError("roleId y userId Son Requeridos");

  // Verificamos si existe un usuario con el userId ingresado
  const isExitsUser = await User.findAll({
    where: {
      userId:userId
    }
  });
  
  // Si no existe un usuario. Lanzamos un Error
  (!isExitsUser.length) && arrojarError("El usuario no existe");

  // Verificamos si roleId es de tipo de dato number e integer. Si no... Lanzamos un Error
  const validRoleId = (typeof roleId == "number" && roleId % 1 == 0);
  (!validRoleId) && arrojarError("roleId debe ser tipo de dato number e integer");

  // Verificamos si el roleId existe en DB
  const isExitsRoleId = await Role.findAll({
    where:{
      roleId: roleId
    }
  });

  // Si no existe un role. Lanzamos un Error
  (!isExitsRoleId.length) && arrojarError("El role no existe");

  // Caso contrario modificamos el role del usuario
  isExitsUser[0].setRole(isExitsRoleId[0]);

  // Definiendo las opciones en mensaje
  const mensaje = {
    userId: isExitsUser[0].userId,
    role: isExitsRoleId[0].name,
    mailWW: EMAIL_CREDENTIALS,
  };
  
  // Enviamos una notificacion del cambio de role hecho; al administrador
  enviarNotificacion(6, isExitsUser[0].name, isExitsUser[0].email, mensaje);
  // Enviamos una notificacion del cambio de role hecho; al usuario
  enviarNotificacion(7, isExitsUser[0].name, isExitsUser[0].email, mensaje);
  
  // return isExitsUser;
  return {
    Perfect: `role successfully updated`
  };
};


// ********************************************************************************


// *** BORRADO LOGICO DE USUARIO ***
const userLogicalDeletionAdmin = async (userId) => {

  // Verificamos si nos pasan argumentos. Si no... Lanzamos un Error
  (!userId) && arrojarError("Parametro userId es Requerido");

  // Verificamos si userId sea de Tipo De Dato String. Si no... Lanzamos un Error
  (typeof userId !== "string") && arrojarError("'userId' de ser un String");

  // Verificamos si el usuario existe.
  const isExitsUser = await User.findAll({
    where: {
      userId: userId,
    },
  });

  // Si no... Lanzamos un Error
  (!isExitsUser.length) && arrojarError("Usuario No Existe");


  // Caso contrario procedemos a realizar el Cambio en "isActive"
  await User.update({isActive: !isExitsUser[0].isActive},{where: {userId: userId}});
  
  // Consultamos el nuevo estado del usuario
  let isActiveU;
  const newState = await User.findAll({where: {userId: userId}});

  const fecha = new Date();
  // Definiendo las opciones en mensaje
  const mensaje = {
    userId: newState[0].userId,
    state: `isActive: ${newState[0].isActive}`,
    date: `${diasSemana[fecha.getDay()]}, ${fecha.toLocaleDateString()}, a las ${fecha.toLocaleTimeString()}`,
    mailWW: EMAIL_CREDENTIALS,
  };
  
  // Decidimos que hacer segun corresponda
  if(newState[0].isActive == true){
    // Enviamos una notificacion del cambio de "isActive" hecho; al administrador
    enviarNotificacion(10, newState[0].name, newState[0].email, mensaje);
    // Enviamos una notificacion del cambio de "isActive" hecho; al usuario
    enviarNotificacion(11, newState[0].name, newState[0].email, mensaje);
    isActiveU = {
      Perfect: `User ${newState[0].name}; Successfully Reactivated.`
    };
  }else {
    // Enviamos una notificacion del cambio de "isActive" hecho; al administrador
    enviarNotificacion(8, newState[0].name, newState[0].email, mensaje);
    // Enviamos una notificacion del cambio de "isActive" hecho; al usuario
    enviarNotificacion(9, newState[0].name, newState[0].email, mensaje);
    isActiveU = {
      Perfect: `User ${newState[0].name}; Successfully Deleted`
    };
  }

  return isActiveU;
};


// ***************************************************************************************************


// *** ENVIO DE EMAIL(s) A USUARIO(s) ***
const sendEmailUsers = async (userId, asunto, titulo, mensaje) => {
  let destinatario;

  // Verificamos si recibimos los argumentos asunto, titulo y mensaje. Si no estan... Lanzamos un Error
  (!asunto || !titulo || !mensaje) && arrojarError("Campos: asunto, titulo y mensaje; Son Requeridos");

  // Verificamos si los campos asunto, titulo y mensaje son tipo de dato String. 
  const isString = (typeof asunto == "string" && typeof titulo == "string" && typeof mensaje == "string");

  // Si no lo son... Lanzamos un Error
  (!isString) && arrojarError("Administrador el tipo de dato para: asunto, titulo y mensaje; Debe ser String");


  // Si recibo userId hacemos esto
  // -----------------------------
  if(userId){
    // En caso de recibir userId, buscamos el usuario en data base
    const user = await User.findAll({
      where: {
        userId: userId
      }
    });

    // Si no encontramos un usario... Lanzamos un Error
    (!user.length) && arrojarError(`No existe un Usuario en DB, con el userId: ${userId}`);

    // En caso de que si exista... Lo asignamos a la variable destinatario
    destinatario = user[0].email;

    // Enviamos un email al usuario
    enviarEmail(destinatario, asunto, titulo, mensaje);
    
    // Enviamos una notificacion al administrador
    enviarNotificacion(5, user[0].name, user[0].email, mensaje); 
    
    return {
      Perfect : `Email sent to user; successfully`,
    };
  }


  // Esta es la parte donde no me pasan el userId por query
  // ------------------------------------------------------
  const usuarios = await User.findAll({
    attributes: ['email'],
  });

  // Si no tenemos usuarios... Lanzamos un Error
  (!usuarios.length) && arrojarError("No hay usuarios en DB; para mandarle Emails");

  // Si tenemos usuarios en DB; Agregamos las cuentas email a un array 
  destinatario = usuarios.map((user) => user.email);

  // Enviamos los email informativos a todos los usuarios
  enviarEmail(destinatario, asunto, titulo, mensaje);

  // Enviamos una notificacion al administrador
  enviarNotificacion(4, null, destinatario, mensaje); 

  return {
    Perfect: `Emails Sent Successfully`,
  };
};


module.exports = {
  updateRoleUser,
  userLogicalDeletionAdmin,
  sendEmailUsers,
};
