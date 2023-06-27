const { Product, Review } = require('../models/relationship/relationship');
const sequelize = require('sequelize');

const searchProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        const product = await Product.findAll({
            where: sequelize.literal(`unaccent("name") ILIKE unaccent('%${name}%')`),
            include: [{
                model: Review,
                attributes: ['rating', 'comment']
            }]
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

module.exports = searchProductByName;
