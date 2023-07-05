require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } = process.env;
// `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
//la ruta de arriba la cambian por DB_DEPLOY para usar su bd

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, 
  native: false, 
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

module.exports = sequelize; // Exportamos la conexion a sequelize
