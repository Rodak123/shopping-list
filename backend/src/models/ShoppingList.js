const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const ShoppingList = sequelize.define('ShoppingList', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
        max: 60,
    },
});

module.exports = ShoppingList;
