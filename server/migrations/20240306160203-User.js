'use strict';

const sequelize = require('../../dbconfig');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'type', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'test'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'type');
  }
};
