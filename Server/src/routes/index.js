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
const { requiresAuth } = require("express-openid-connect");

const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const roleRouter = require("./roleRouter"); 
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'tempUploads/' });

//user routes
router.post('/userAddress', postUserAddress)
router.use("/", userRouter);
router.get('/userLogin', (req, res) => {
  res.redirect('http://localhost:3001/login');
});
router.get('/userProfile', requiresAuth(), (req, res) => {
	try {
		const info= req.oidc.user;
		res.status(200).json({name:info.name,email:info.email,role:info.role})
	} catch (error) {
		res.status(401).json({message:error.message})
	}
});

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


module.exports = router;
