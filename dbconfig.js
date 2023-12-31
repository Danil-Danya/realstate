require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: process.env.SQL_DIALECT,
    storage: process.env.SQL_STORAGE,
});

module.exports = sequelize;