const { Product, Review } = require('../models/relationship/relationship');
const { Op } = require('sequelize');

const searchProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        const productName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const product = await Product.findAll({
            where: { name: {[Op.iLike]: `%${productName}%`} },
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
