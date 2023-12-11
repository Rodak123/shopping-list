const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const AuthSession = sequelize.define('AuthSession', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 0,
        max: 256,
    },
    date_expires: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = AuthSession;
