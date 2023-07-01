const { Router } = require('express');
const getAllProducts = require('../controllers/getAllProducts.controller');
const getAllUsers = require('../controllers/getAllUsers.controller');
const createProduct = require('../controllers/createProduct.controller');
const editProduct = require('../controllers/editProduct.controller');
const deleteProduct = require('../controllers/deleteProduct.controller');
const searchProductByName = require('../controllers/getProductByName.controller');
const filteredProduct = require('../controllers/filteredProducts.controller');
const getDetailProduct = require('../controllers/getDetailProduct.controller');
const { postUserAddress, getUserAddress} = require('../controllers/userAddress.controller');
const userFinalDelete = require('../controllers/userFinalDelete.controller')
const deleteAddress = require('../controllers/userDeleteAddress.controller')
const createReview = require('../controllers/createReview.controller')
const createPurchase= require('../controllers/createPurchase.controller')
const getAllPurchase = require('../controllers/getAllPurchases.controller')
const getPurchase = require('../controllers/getPurchase.controller')
const editStatePurchase = require('../controllers/editStatePurchase.controller')
const loginUser = require('../controllers/loginUser.controller')
const getAllPurchById = require('../controllers/getAllPurchById.controller')
const getAllStatuses = require('../controllers/getAllStatuses.controller')
const jwt = require('express-jwt');
const {SECRET} = process.env;
const filteredUsers = require('../controllers/filteredUsers.controller')
const searchUserByName = require('../controllers/getUserByName.controller')


const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter");
const userRouterAdmin = require("./userRouterAdmin"); 
const statusRoutes = require('./status.routes');

const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'tempUploads/' });

//user routes
router.get('/userAddress/:id', getUserAddress)
router.post('/userAddress', postUserAddress)
router.use("/", userRouter);
router.post('/createReview/:productId',createReview)
router.delete('/deleteAddress/:id', deleteAddress)
router.post('/createPurchase',createPurchase)
router.get('/getPurchase/:purchaseId', getPurchase)
router.get('/getAllPurchById/:userId', getAllPurchById)
router.post('/userLogin', loginUser)

//user and admin routes
router.get('/searchProduct', searchProductByName)
router.get('/allproducts', getAllProducts)
router.get('/filteredProducts', filteredProduct)
router.get('/detailProduct/:id', getDetailProduct)

//admins routes
router.get('/searchUser', searchUserByName)
router.get('/filteredUsers', jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), filteredUsers)
router.get('/allUsers', jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), getAllUsers)
router.get('/detailProduct/:id', getDetailProduct)
router.get('/allStatuses', jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), getAllStatuses)
router.delete('/userDelete/:id', userFinalDelete)
router.post('/productCreated',upload.single('image'),createProduct)
router.put('/editProduct/:id', jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), editProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.use("/", categoryRouter);
router.use("/", jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), roleRouter);
router.use("/", userRouterAdmin);
router.use('/', statusRoutes);
router.get('/allPurchases', jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), getAllPurchase)
router.put('/editPurchase/:purchaseId', jwt.expressjwt({ secret: SECRET, algorithms: ['HS256'] }), editStatePurchase)


module.exports = router;
