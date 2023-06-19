const { Product, Review } = require('../models/relationship/relationship');
const { Op } = require('sequelize');

const searchProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        const product = await Product.findAll({
            where: { name: {[Op.iLike]: `%${name}%`} },
            // include: [{
            //     model: Review,
            //     attributes: ['rating', 'comment'],
            //     through: { attributes: [] }
            // }]
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

module.exports = searchProductByName;