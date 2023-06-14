const { Router } = require('express');
const getAllProducts = require('../controllers/getAllProducts.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const createProduct = require('../controllers/createProduct.controller');
const router = Router();















//user routes


//user and admin routes
router.get('/allproducts', getAllProducts)

//admins routes
router.get('/allproducts', getAllUsers)
router.post('/productCreated',createProduct)




module.exports = router;