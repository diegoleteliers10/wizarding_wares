const { User } = require('../models/relationship/relationship');
const sequelize = require('sequelize')

const searchUserByName = async (req, res) => {
    const { name } = req.query;
    try {
        const user = await User.findAll({
            where: sequelize.literal(`unaccent("name") ILIKE unaccent('%${name}%')`)
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};
 module.exports = searchUserByName;