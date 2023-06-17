const { Product, Review } = require('../models/relationship/relationship');

const getDetailProduct = (req, res) => {
    const { id } = req.params;
    try {
        const product = Product.findByPk(id, {
            attributes: ['name', 'description', 'image', 'price', ],
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