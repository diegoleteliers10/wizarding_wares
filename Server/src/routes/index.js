const { Router } = require('express');
const getAllPics = require('../controllers/getAllpics');
const router = Router();

router.get("/images",getAllPics)



module.exports = router;