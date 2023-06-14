const User = require("../models/Product.model");
const Role = require("../models/Roles.model");


const getAllUsers= async(req,res)=>{
  try {
    //la idea es traer todos los productos desde la base de datos, junto con sus imagenes, se hara un borrado del endpoint de imagenes y se agregara a cada producto la imagen
    const response = await User.findAll({
      include: [
        {
          model: Role,
          where: { name: 'usuario' }, //aca iria el nombre del rol que quiero trae
          required: true, // Esto asegura que solo se devuelvan los usuarios que tienen una coincidencia en la tabla Roles
        },
      ],
    });

    const users = response.map(user => ({
      ...user.dataValues,
    }));

    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports=getAllUsers;