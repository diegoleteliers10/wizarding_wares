const express = require("express");
const server = express();
const morgan = require("morgan");
const { auth, requiresAuth } = require("express-openid-connect");

const { CLIENT_ID, ISSUER_BASE_URL, SECRET, PORT } = process.env;

const router = require("./routes/index");

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: SECRET,
	baseURL: `http://localhost:${PORT}`,
	clientID: CLIENT_ID,
	issuerBaseURL: ISSUER_BASE_URL,
};

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
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
// server.use('/rickandmorty', router); --> NO EXISTE ESA RUTA, DA ERROR

// Ruta Principal Provisoria
// server.get("/", (req, res) => {
// 	res.status(200).json({
// 		PF_name: "Merka Magica",
// 	});
// });  cambio de ruta provicional para mostrar si uno esta login o logout

server.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
}); //nueva ruta principal

server.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
}); // ruta para ver la informacion del usuario (preliminar)

module.exports = server;
