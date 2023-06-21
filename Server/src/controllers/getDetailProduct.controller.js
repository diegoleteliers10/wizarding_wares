const Product = require('../models/Product.model');
const Review = require('../models/Review.model');

const getDetailProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
        attributes: ['name', 'description', 'image', 'price', 'stock'],
        include: [
            {
            model: Review,
            attributes: ['rating', 'comment']
            }
        ]
        });
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({error: error.message})
    };
    
};

module.exports = getDetailProduct;
