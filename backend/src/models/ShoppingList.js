const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const ShoppingList = sequelize.define('ShoppingList', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
        max: 60,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = ShoppingList;
