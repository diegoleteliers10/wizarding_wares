const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define("product", {
	productId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
});

module.exports = Product;
