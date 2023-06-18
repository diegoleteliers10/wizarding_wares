const { Router } = require('express');
const getAllProducts = require('../controllers/getAllProducts.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const createProduct = require('../controllers/createProduct.controller');
const editProduct = require('../controllers/editProduct.controller')
const deleteProduct = require('../controllers/deleteProduct.controller')
const searchProductByName = require('../controllers/getProductByName.controller')
const filteredProduct = require('../controllers/filteredProducts.controller')
const getDetailProduct = require('../controllers/getDetailProduct.controller')

const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter"); 
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//user routes
router.use("/", userRouter);

//user and admin routes
router.get('/searchProduct', searchProductByName)
router.get('/allproducts', getAllProducts)
router.get('/filteredProducts', filteredProduct)
router.get('/detailProduct/:id', getDetailProduct)

//admins routes
router.get('/allUsers', getAllUsers)
router.get('/detailProduct/:id', getDetailProduct)

router.post('/productCreated',upload.single('image'),createProduct)
router.put('/editProduct/:id', editProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.use("/", categoryRouter);
router.use("/", roleRouter);


module.exports = router;
