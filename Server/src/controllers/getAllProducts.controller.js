const Product = require("../models/Product.model");


const getAllProducts= async(req,res)=>{
  try {
    //la idea es traer todos los productos desde la base de datos, junto con sus imagenes, se hara un borrado del endpoint de imagenes y se agregara a cada producto la imagen
    const response = await Product.findAll();

    const products = response.map(product => ({
      ...product.dataValues,
    }));

    res.status(200).json(products)

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports=getAllProducts;