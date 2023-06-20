const { Address } = require('../models/relationship/relationship');

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
        newAddress.addUsers(userId);
        res.status(200).send('Address created')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = postUserAddress;