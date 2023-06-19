const { Product } = require('../models/relationship/relationship');

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;
    console.log(req.body)


    try {
        const product = await Product.findByPk(id);
        if (product) {

            const propertiesToUpdate = { name, description, price, stock, categoryCategoryId: categoryId };
            // Actualizar SOLO las propiedades proporcionadas en la solicitud
        for (const key in propertiesToUpdate) {
            if (propertiesToUpdate[key] !== undefined) {
            product[key] = propertiesToUpdate[key];
            }
        }
           await product.save();
           res.status(200).send('Successful upgrade');
       } else{ 
           res.status(404).send({message: 'Product not found'})
       }
    } catch (error) {
        res.status(500).send({message: 'Error updating product'})
    };
};

module.exports = editProduct;