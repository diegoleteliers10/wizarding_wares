const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Status = sequelize.define("status", {
	statusId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = Status;
