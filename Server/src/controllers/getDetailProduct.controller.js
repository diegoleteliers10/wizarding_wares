const { Product, Review } = require('../models/relationship/relationship');

const getDetailProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            attributes: ['name', 'description', 'image', 'price', 'stock'],
            include: [{
                model: Review,
                attributes: ['rating', 'comment'],
                through: { attributes: [] }
            }]
        });
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({error: error.message})
    };
    
};

module.exports = getDetailProduct;
