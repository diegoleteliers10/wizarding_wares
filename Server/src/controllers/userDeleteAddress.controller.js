const { Address } = require('../models/relationship/relationship');

const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        await Address.destroy({
            where: { addressId: id }
        }); 
        res.status(200).send('Address has been successfully deleted!')
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};

module.exports = deleteAddress;