const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Categories = sequelize.define("categories", {
	categoryId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Categories;
