const express = require("express");
const server = express();
const morgan = require("morgan");

const router = require("./routes/index");

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
// server.use('/rickandmorty', router); --> NO EXISTE ESA RUTA, DA ERROR

// Ruta Principal Provisoria
server.get("/", (req, res) => {
	res.status(200).json({
		PF_name: "Merka Magica",
	});
});

module.exports = server;
