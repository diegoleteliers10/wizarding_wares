const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Products = sequelize.define("products", {
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
	rating: {
		type: DataTypes.ARRAY,
	},
	comments: {
		type: DataTypes.ARRAY,
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

module.exports = Products;
