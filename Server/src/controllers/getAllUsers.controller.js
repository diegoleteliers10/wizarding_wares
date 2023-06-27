const User = require("../models/Users.model");
const Role = require("../models/Roles.model");
// const { User, Role } = require("../models/relationship/relationship");

const getAllUsers = async (req, res)=>{
  try {
    //la idea es traer todos los productos desde la base de datos, junto con sus imagenes, se hara un borrado del endpoint de imagenes y se agregara a cada producto la imagen
    const response = await User.findAll({
            // include: [
      //   {
      //     model: Role,
      //     where: { name: 'usuario' }, //aca iria el nombre del rol que quiero trae
      //     required: true, // Esto asegura que solo se devuelvan los usuarios que tienen una coincidencia en la tabla Roles
      //   },
      // ],

      include: [
        {
          model: Role,
          attributes: ['name'],
          required: true,
        },
      ],
    });

    // const users = response.map(user => ({
    //   ...user.dataValues,
    // }));

    // res.status(200).json(users);
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports = getAllUsers;