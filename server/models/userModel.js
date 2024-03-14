const sequelize = require('../../dbconfig.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

User.sync();

module.exports = User;