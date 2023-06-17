const Product = require("../models/Product.model");

const createProduct = async (req, res) => {
  const {name,description,stock, image ,price,categoryId} = req.body //args preliminares
  try {
    const createdProduct = await Product.create({
    name: name,
    description: description,
    image: image,
    price: price,
    stock: stock,
    categoryCategoryId: categoryId
  })

    res.status(200).send({product:createdProduct,message:'Product created'})

  } catch (error) {
    res.status(400).send({message:error.message})
  }
}

module.exports = createProduct