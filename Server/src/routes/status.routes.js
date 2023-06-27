const { Router } = require('express');
const statusRoutes = Router();
const { editStatus, createStatus, deleteStatus } = require('../controllers/status.controller')

//ADMIN
statusRoutes.post('/status', async (req, res) => {
    const { name } = req.body;
       try {
           await createStatus(name)
           return res.status(201).send('Status has been successfully created!')
       } catch (error) {
           return res.status(404).json({ error: error.message })
       };
});

statusRoutes.delete('/status/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteStatus(id)
        return res.status(201).send('Status has been successfully deleted!')
    } catch (error) {
        return res.status(404).json({ error: error.message })
    };
});

statusRoutes.put('/status/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await editStatus(id, name)
        return res.status(200).send('Status has been successfully edited!')
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


module.exports = statusRoutes;
