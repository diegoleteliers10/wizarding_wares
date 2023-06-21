const { User } = require('../models/relationship/relationship');

const userFinalDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({
            where: { userId: id }
        });
        res.status(200).send('User has been successfully deleted!')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = userFinalDelete;