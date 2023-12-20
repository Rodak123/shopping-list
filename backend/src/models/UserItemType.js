const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const UserItemType = sequelize.define('UserItemType', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count_used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = UserItemType;
