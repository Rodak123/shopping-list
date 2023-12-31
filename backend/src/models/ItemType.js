const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const ItemType = sequelize.define('ItemType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
        max: 60,
    },
});

module.exports = ItemType;
