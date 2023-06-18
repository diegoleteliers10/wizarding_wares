const { Role } = require("../models/relationship/relationship");
const {arrojarError, validateString} = require("../utils/utils");

// *** CREAR NUEVO ROLE ***
const createNewRole = async (name) => {
  
  // Verificamos si recibimos o no argumentos
  (!name) && arrojarError("Parametro Necesario Inexistente");

  // Verificamos si name es de tipo de dato String... Si no. Lanzamos un Error
  (typeof name !== "string") && arrojarError("'name'; debe ser de tipo de dato String");

  // Verificamos si contiene solo letras y espacios
  const isValidString = validateString(name);

  // En caso de que no sea. Lanzamos un Error
  (!isValidString) && arrojarError("'name' debe contener solo letras y espacios");

  // Verificar si el role ingresado ya sea parte del DB
  const isExist = await Role.findOne({
    where:{
      name: name
    }
  });

  // En caso que ya tengamos desde antes el role... Lanzamos un Error
  (isExist !== null) && arrojarError("'role' ingresado no esta disponible. Ya esta en DB");

  // Caso contrario lo creamos
  const newRole = await Role.create({name});
  // return newRole;
  return {
    "Perfect": "Role Created Successfully"
  }
};


module.exports = {
  createNewRole,
};