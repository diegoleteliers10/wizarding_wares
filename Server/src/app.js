const express = require("express");
const server = express();
const morgan = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");
const cloudinary = require('cloudinary').v2;

const { CLIENT_ID, ISSUER_BASE_URL, SECRET, PORT, CLOUD_NAME, KEY_CLOUD, SECRET_CLOUD  } = process.env;

const routes = require("./routes/index");

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

// server.get('/upload', (req, res) => {
//   const filePath = path.join(__dirname, 'images', 'naruto.jpg');

//   cloudinary.uploader.upload(filePath)
//     .then(result => {
//       console.log(result);
//       res.send('Foto subida exitosamente');
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).send('Error al subir la foto');
//     });
// }); //sirve para subir fotos a cloudinary

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

server.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
}); // ruta para ver la informacion del usuario (preliminar)

module.exports = server;
