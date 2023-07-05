const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Status = sequelize.define("status", {
	statusId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = Status;
