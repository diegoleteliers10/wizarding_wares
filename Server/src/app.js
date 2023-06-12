const express = require("express");
const server = express();
const morgan = require("morgan");
const { auth } = require('express-openid-connect');

const {CLIENT_ID,ISSUER_BASE_URL,SECRET}= process.env

const router = require("./routes/index");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: 'http://localhost:3000',
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL
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
server.get("/", (req, res) => {
	res.status(200).json({
		PF_name: "Merka Magica",
	});
});

module.exports = server;
