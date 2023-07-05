require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY, CHOOSE_DB } = process.env;

if(CHOOSE_DB == "true"){
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false, 
    native: false, 
  });
  console.log("Conectados a la DB de Local");

  module.exports = sequelize; // Exportamos nuestra conexión de sequelize

} else {
  const sequelize = new Sequelize(DB_DEPLOY, {
    logging: false, 
    native: false, 
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  });
  console.log("Conectados a la DB de Deployada");

  module.exports = sequelize; // Exportamos nuestra conexión de sequelize
}


