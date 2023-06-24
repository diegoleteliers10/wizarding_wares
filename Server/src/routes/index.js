const { Router } = require('express');
const getAllProducts = require('../controllers/getAllProducts.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const createProduct = require('../controllers/createProduct.controller');
const editProduct = require('../controllers/editProduct.controller');
const deleteProduct = require('../controllers/deleteProduct.controller');
const searchProductByName = require('../controllers/getProductByName.controller');
const filteredProduct = require('../controllers/filteredProducts.controller');
const getDetailProduct = require('../controllers/getDetailProduct.controller');
const postUserAddress = require('../controllers/userAddress.controller');
const userFinalDelete = require('../controllers/userFinalDelete.controller')
const deleteAddress = require('../controllers/userDeleteAddress.controller')
const createReview = require('../controllers/createReview.controller')
const createPurchase= require('../controllers/createPurchase.controller')
const getAllPurchase = require('../controllers/getAllPurchases.controller')
const getPurchase = require('../controllers/getPurchase.controller')
const editStatePurchase = require('../controllers/editStatePurchase.controller')
const loginUser = require('../controllers/loginUser.controller')


const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const userRouterAdmin = require("./userRouterAdmin"); 
const statusRoutes = require('./status.routes');

const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'tempUploads/' });

//user routes
router.post('/userAddress', postUserAddress)
router.use("/", userRouter);
router.post('/createReview',createReview)
router.delete('/deleteAddress/:id', deleteAddress)
router.post('/createPurchase',createPurchase)
router.get('/getPurchase/:userId', getPurchase)
router.post('/userLogin', loginUser)

//user and admin routes
router.get('/searchProduct', searchProductByName)
router.get('/allproducts', getAllProducts)
router.get('/filteredProducts', filteredProduct)
router.get('/detailProduct/:id', getDetailProduct)

//admins routes
router.get('/allUsers', getAllUsers)
router.get('/detailProduct/:id', getDetailProduct)
router.delete('/userDelete/:id', userFinalDelete)
router.post('/productCreated',upload.single('image'),createProduct)
router.put('/editProduct/:id', editProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.use("/", categoryRouter);
router.use("/", roleRouter);
router.use("/", userRouterAdmin);
router.use('/', statusRoutes);
router.get('/allPurchases', getAllPurchase)
router.put('/editPurchase/:purchaseId',editStatePurchase)


module.exports = router;
