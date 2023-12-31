const { DataTypes } = require('sequelize');
const sequelize = require('../../dbconfig.js');

const Appartaments = sequelize.define('Appartaments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    dateOfCreate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    priceForRent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    priceForBuy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    long: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imgPaths: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagesMemory: {
        type: DataTypes.STRING,
        allowNull: true
    },
    addres: {
        type: DataTypes.STRING,
        allowNull: true
    },
    propertyType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    combSelect: {
        type: DataTypes.STRING,
        allowNull: true
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    baths: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    square: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    unitReferense: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    propertyName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emirate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    purpose: {
        type: DataTypes.STRING,
        allowNull: true
    },
    indoor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    outdoor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstSlide: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    isSlide: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isDraft: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})


Appartaments.sync();


module.exports = Appartaments;