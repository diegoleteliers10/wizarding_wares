const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Role = sequelize.define("role", {
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Role;