const { arrojarError, validateString } = require("../utils/utils");
const {Categorie} = require("../models/relationship/relationship");


// *** PEDIR TODAS LAS CATEGORIAS ***
const getAllCategories = async () => {
  // Primero validamos si tenemos datos en Categorie
  const exists = await Categorie.findAll();

  // Si no encuentra nada, nos devuelve un mensaje
  if(exists.length == 0){
    arrojarError("No Tienes Categorias En Base De Datos");
  }

  // Caso Contrario Las Traemos Todas
  return exists;
};


// ***************************************************************************************


// *** CREAR UNA CATEGORIA ***
const crearCategoria = async (name) => {
  // Si no pasan un dato, se arroja un error
  if(!name) {
    arrojarError("Parametro necesario Inexistente");
  }

  // validamos si el dato ingresado es un string de solo letras y espacios
  const isValidate = validateString(name);

  // En caso de que contenga otro tipo caracteres arrojara un error
  if(!isValidate) {
    arrojarError("Nombre de categoria solo debe contener letras y espacios");
  }
  
  // Comprobamos si ya tenemos la categoria guardada en nuestra base de datos
  const isRepeat = await Categorie.findAll({
    where: {
      name : name
    }
  });

  // Si encuentra la categoria en base de datos, arrojamos un error
  if(isRepeat.length > 0 ){
    arrojarError("Categoria Ya Existe");
  }

  // Caso Contrario La Creamos
  const newCategorie = await Categorie.create({name});
  // return newCategorie;
  return `Categorie ${name}. Created Successfully`;
};


// ***************************************************************************************

// *** MODIFICAR UNA CATEGORIA ***
const updateACategory = async (name, modify) => {

  // Primero verificamos si tenemos o no categorias
  const exists = await Categorie.findAll();

  // En el caso de no tener categorias a modificar lanzamos un error
  if(!exists.length){
    arrojarError("No Tienes Categorias Para Modificar");
  }

  // Verificamos si nos pasan argumento o no
  (!name || !modify) && arrojarError("Parametros Necesarios Incompletos");

  // Validamos si los argumentos ingresados son de tipo String
  const validName = validateString(name);
  const validModify = validateString(modify);

  // Si los argumentos no cumplen la condicion de solo Letras Y Espacios. Lanzamos un error
  if(!validName || !validModify){
    arrojarError("Parametros; Deben De Ser Solo Letras Del ABC y Espacios");
  }

  // Buscamos la categoria que queremos modificar
  const categorie = await Categorie.findOne({
    where: {
      name: name
    }
  });

  // Si no existe la categoria lanzamos un error
  if(categorie == null){
    arrojarError(`Categorie ${name}; No Existe En Tu DB`);
  }

  // Caso contrario modificamos el nombre de nuestra categoria
  const newNameCategory = await Categorie.update({name: modify},{
    where: {
      name: name
    }
  });

  // return newNameCategory;
  return `Modification Made Successfully`;
};

module.exports = {
  crearCategoria,
  getAllCategories,
  updateACategory,
};