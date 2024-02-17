const { DataTypes } = require('sequelize');
const sequelize = require('../../dbconfig.js');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.STRING,     
        allowNull: false
    },

    views: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    date: {
        type: DataTypes.STRING,
        allowNull: false
    },

    time: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tags: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    isDraft: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

Post.sync();

module.exports = Post