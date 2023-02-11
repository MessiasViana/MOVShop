'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'profiles',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        profile: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('profiles')
  }
};
