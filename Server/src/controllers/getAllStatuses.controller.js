const Status = require("../models/Status.model")

const getAllStatuses = async(req, res) =>{
    try {

        const response = await Status.findAll({
            attributes:['statusId','name']
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getAllStatuses;