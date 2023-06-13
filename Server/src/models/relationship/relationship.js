// 1_ Aqui importaremos nuestros modelos listos y conectados a sequelize
const Product = require("../Product.model");
const Categorie = require("../Categorie.model");
const Purchase = require("../Purchase.model");
const Status = require("../Status.model");
const Role = require("../Roles.model");
const User = require("../Users.model");


// 2_ Haremos las relaciones entre ellos
Categorie.hasMany(Product);
Product.belongsTo(Categorie);
Status.hasMany(Purchase);
Purchase.belongsTo(Status);
Role.hasMany(User);
User.belongsTo(Role);


// 3_ Exportremos Los Modelos Con La Relacion Entre Estos Integrada
module.exports = {
	Product,
	Categorie,
	Purchase,
	Status,
};
// Y sera desde aqui que tomaremos los modelos para hacer el trabajo con rutas y controllers
