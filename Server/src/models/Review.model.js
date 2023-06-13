const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Review = sequelize.define('review', {
    productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
});

module.exports = Review;