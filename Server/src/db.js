require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});
//uso db propia

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, 
//   native: false, 
//   dialectOptions: {
//     ssl: {
//       require: true
//     }
//   }
// });
//uso db externa

module.exports = sequelize; // Exportamos la conexion a sequelize
