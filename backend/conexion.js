const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './autos.sqlite' // archivo de base de datos
});

module.exports = sequelize;