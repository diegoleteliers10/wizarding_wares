const { Router } = require('express');
const getAllProducts = require('../controllers/getAllProducts.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const createProduct = require('../controllers/createProduct.controller');
const editProduct = require('../controllers/editProduct.controller')
const deleteProduct = require('../controllers/deleteProduct.controller')
const categorieRouter = require("./categorieRouter");
const router = Router();

//user routes


//user and admin routes
router.get('/allproducts', getAllProducts)

//admins routes
router.get('/allproducts', getAllUsers)
router.post('/productCreated',createProduct)
router.put('/editProduct/:id', editProduct)
router.delete('deleteProduct/:id', deleteProduct)
router.use("/", categorieRouter);

module.exports = router;
