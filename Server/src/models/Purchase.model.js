const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Purchase = sequelize.define("purchase", {
	purchaseId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
});

module.exports = Purchase;
