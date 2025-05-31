const { DataTypes } = require('sequelize');
const sequelize = require('./conexion');

const autos = sequelize.define('Autos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    marca: { type: DataTypes.STRING },
    modelo: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    valor: { type: DataTypes.FLOAT },
    colorDisponible: { type: DataTypes.STRING }
}, {
    timestamps: false
});

module.exports = autos;
