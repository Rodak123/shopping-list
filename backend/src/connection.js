const Sequelize = require('sequelize');

const sequelize = new Sequelize.Sequelize('shopping_list', 'shopping_list', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set to false to disable logging SQL queries
});

module.exports = sequelize;
