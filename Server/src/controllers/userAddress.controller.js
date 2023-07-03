const { Address, User } = require('../models/relationship/relationship');

const postUserAddress = async (req ,res) => {
    const { street, number, zipCode, detail, phoneNumber, userId } = req.body;
    try {
        const newAddress = await Address.create({
            street,
            number,
            zipCode,
            detail,
            phoneNumber
        });
        await newAddress.addUsers(userId);
        res.status(200).send('Address created')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getUserAddress = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const response = await User.findByPk(id, {
            include: [{
                model: Address,
                attributes: ['street', 'number', 'zipCode', 'detail', 'phoneNumber'],
                required: true
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { postUserAddress, getUserAddress };