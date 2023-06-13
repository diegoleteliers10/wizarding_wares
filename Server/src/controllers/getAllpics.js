const axios = require('axios');

const getAllPics = async (req,res) => {
  try {
    // Buscamos el perro por su ID
    const imagenes = await axios.get(`https://398427172815388:qwQCCHXyHDGW6bW1BILuEFSJYew@api.cloudinary.com/v1_1/dfjzdxfop/resources/image`)
    const allImg= imagenes.data.resources;

    res.status(200).send(allImg)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports= getAllPics;