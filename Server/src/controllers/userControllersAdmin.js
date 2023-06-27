const { User, Role } = require("../models/relationship/relationship");
const {arrojarError} = require("../utils/utils");


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
  // return isExitsUser;
  return {
    "Perfect": `role successfully updated`
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


  // Caso contrario procedemos a realizar el Borrado Logico del Usuario
  await User.update({isActive: !isExitsUser[0].isActive},{where: {userId: userId}});

  return {
    "Perfect": `User ${isExitsUser[0].name}; Successfully Deleted`
  };
};


module.exports = {
  updateRoleUser,
  userLogicalDeletionAdmin,
};
