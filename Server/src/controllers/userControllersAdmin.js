const { User } = require("../models/relationship/relationship");
const {arrojarError} = require("../utils/utils");


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
  userLogicalDeletionAdmin,
};
