const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
        max: 60,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
    },
});

module.exports = User;
