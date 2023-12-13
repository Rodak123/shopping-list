const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Item = sequelize.define('Item', {
    note: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
        max: 256,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1,
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

module.exports = Item;
