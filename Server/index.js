require("dotenv").config();
const { PORT } = process.env;
const server = require("./src/app");
// const { db } = require("./DB_connection");

server.listen(PORT, async () => {
	console.log("Server raised in port: " + PORT);
	// await db.sync({ force: true });
});
