const Product = require('../models/Product.model');
const Review = require('../models/Review.model');
const Users = require('../models/Users.model')

const getDetailProduct = async (req, res) => {
    const { id } = req.params;
    try {
        //buscamos el id en la lista de DB de productos junto a sus propiedades.
        const product = await Product.findByPk(id, {
            attributes: ['name', 'description', 'image', 'price', 'stock'],
            include: {
                model: Review,
                attributes: ['rating', 'comment'],
                include: {
                    model: Users,
                    attributes: ['name']
                }
            }
        });
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({error: error.message})
    };
    
};

module.exports = getDetailProduct;
