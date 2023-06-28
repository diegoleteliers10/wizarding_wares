const express = require("express");
const server = express();
const morgan = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");
const cloudinary = require('cloudinary').v2;
const paymentRoutes = require('./routes/payment.routes');
const mercadopago = require('mercadopago');
const cors = require('cors');
const bodyParser = require('body-parser')

const { CLIENT_ID, ISSUER_BASE_URL, SECRET, PORT, CLOUD_NAME, KEY_CLOUD, SECRET_CLOUD, ACCESS_TOKEN  } = process.env;

const routes = require("./routes/index");

// const Product = require("./models/Product.model")
// const Category = require("./models/Category.model")
// const data = require("../assets/data.json")
// const categorieData = ["Libros","Varitas","Indumentaria","Golosinas","Quidditch","Misceláneas"]
// for (let i = 0; i < categorieData.length; i++) {
//   Category.create({
//       name: categorieData[i],
//       isActive: true
//   })
//     .then((categorie) => {
//       console.log("Categorie created:", categorie);
//     })
//     .catch((error) => {
//       console.error("Error creating categorie:", error);
//     })
// }
// setTimeout(() => {
  
// for (let i = 0; i < data.length; i++) {
//     Product.create({ 
//     name: data[i].name,
//     description: data[i].description,
//     image: data[i].image,
//     price: data[i].price,
//     stock: data[i].stock,
//     categoryCategoryId: data[i].categoryId
//   })
//     .then((product) => {
//       console.log("Product created:", product);
//     })
//     .catch((error) => {
//       console.error("Error creating product:", error);
//     });
//   }
// }, 2000);


//Config de Auth0
const config = {
	authRequired: false,
	auth0Logout: true,
	secret: SECRET,
	baseURL: `http://localhost:${PORT}`,
	clientID: CLIENT_ID,
	issuerBaseURL: ISSUER_BASE_URL,
}; 

//Config de Cloudinary
cloudinary.config({ 
	cloud_name: CLOUD_NAME, 
	api_key: KEY_CLOUD, 
	api_secret: SECRET_CLOUD 
});

//Config Mercadopago
mercadopago.configure({
	access_token: ACCESS_TOKEN
});

//Config rutas de MercadoPago
server.use(bodyParser.json());
server.use(cors());
server.use(paymentRoutes)


server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

// Middlewares
server.use(express.json());
server.use(morgan("dev"));
server.use(auth(config));
server.use("/", routes);
// server.use(express.static("public"));

// Ruta Principal Provisoria
server.get('/', (req, res) => {
	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}); 


module.exports = server;