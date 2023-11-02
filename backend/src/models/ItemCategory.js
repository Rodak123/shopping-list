const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const ItemCategory = sequelize.define('Item_Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    min: 0,
    max: 60,
  },
});

module.exports = ItemCategory;
