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

// const Status = require("./models/Status.model")

// const estados = ["en preparacion", "en camino", "entregado"]

// for(let i=0; i<estados.length; i++){
// 	const estado = Status.create({
// 		name:estados[i]
// 	})
// }

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

// Ruta Principal Provisoria
server.get('/', (req, res) => {
	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}); 


module.exports = server;