const axios = require('axios');

const {CLOUD_NAME, KEY_CLOUD, SECRET_CLOUD  } = process.env;

const getAllPics = async (req,res) => {
  try {
    // Buscamos el perro por su ID
    const imagenes = await axios.get(`https://${KEY_CLOUD}:${SECRET_CLOUD}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`)
    const allImg= imagenes.data.resources;

    res.status(200).send(allImg)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports= getAllPics;