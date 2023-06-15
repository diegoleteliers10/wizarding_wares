const Product = require("../models/Product.model");

const createProduct = async (req, res) => {
  const {id,name,description,price,category} = req.body //args preliminares
  try {
    const createdProduct = await Product.create({
      id,
      name,
      description,
      price,
      category,
    })

    res.status(200).send({message:'Product created'})

  } catch (error) {
    res.status(400).send({message:'Error creating a product'})
  }
}

module.exports = createProduct