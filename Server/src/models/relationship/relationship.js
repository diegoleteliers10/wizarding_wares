// 1_ Aqui importaremos nuestros modelos listos y conectados a sequelize
const Product = require("../Product.model");
const Categorie = require("../Categorie.model");
const Purchase = require("../Purchase.model");
const Status = require("../Status.model");
const Role = require("../Roles.model");
const User = require("../Users.model");
const Address = require("../Address.model");

// 2_ Haremos las relaciones entre ellos
Role.hasMany(User);
User.belongsTo(Role);
Categorie.hasMany(Product);
Product.belongsTo(Categorie);
Status.hasMany(Purchase);
Purchase.belongsTo(Status);
User.hasMany(Purchase);
Purchase.belongsTo(User);
Address.hasMany(Purchase);
Purchase.belongsTo(Address);
Product.belongsToMany(Purchase, { through: "Purchase_Product" });
Purchase.belongsToMany(Product, { through: "Purchase_Product" });
User.belongsToMany(Address, { through: "User_Address" });
Address.belongsToMany(User, { through: "User_Address" });

// 3_ Exportremos Los Modelos Con La Relacion Entre Estos Integrada
module.exports = {
	Product,
	Categorie,
	Purchase,
	Status,
	Role,
	User,
	Address,
};
// Y sera desde aqui que tomaremos los modelos para hacer el trabajo con rutas y controllers
