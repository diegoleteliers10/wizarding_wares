const { Router } = require('express');
const getAllPics = require('../controllers/getAllpics');
const categorieRouter = require("./categorieRouter");
const router = Router();

router.use("/", categorieRouter);

router.get("/images",getAllPics);



module.exports = router;