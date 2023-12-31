const { DataTypes } = require('sequelize');
const sequelize = require('../../dbconfig.js');

const Requests = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    date: {
        type: DataTypes.STRING,
        allowNull: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true
    },

    from: {
        type: DataTypes.STRING,
        allowNull: true
    },

    fromPage: {
        type: DataTypes.STRING,
        allowNull: true
    },


    connectionType: {
        type: DataTypes.STRING,
        allowNull: true
    },

    isNew: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

    question: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Requests.sync();

module.exports = Requests;