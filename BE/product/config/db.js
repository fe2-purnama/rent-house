const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('renthouse', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
