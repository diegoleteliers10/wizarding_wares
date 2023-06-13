// 1_ Aqui importaremos nuestros modelos listos y conectados a sequelize
const Products = require("../Products.model");
const Categories = require("../Categories.model");

// 2_ Haremos las relaciones entre ellos

// 3_ Exportremos Los Modelos Con La Relacion Entre Estos Integrada
// module.exports = {
// 	Products,
// 	Categories,
// };
// Y sera desde aqui que tomaremos los modelos para hacer el trabajo con rutas y controllers
