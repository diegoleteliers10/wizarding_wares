const express = require("express");
const server = express();
const morgan = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");
const cloudinary = require('cloudinary').v2;

const { CLIENT_ID, ISSUER_BASE_URL, SECRET, PORT, CLOUD_NAME, KEY_CLOUD, SECRET_CLOUD  } = process.env;

const routes = require('./routes/index.js');

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
server.use('/', routes);
server.use(express.json());
server.use(morgan("dev"));
server.use(auth(config));

// Ruta Principal Provisoria
server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}); 

server.get('/profile', requiresAuth(), (req, res) => {
	try {
		const info= req.oidc.user;
		console.log(info);
		res.status(200).json({name:info.name,email:info.email})
	} catch (error) {
		res.status(401).json({message:error.message})
	}
}); // ruta para ver la informacion del usuario 

module.exports = server;
