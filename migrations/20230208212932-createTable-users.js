'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        datebirth: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        profile: {
          type: DataTypes.INTEGER,
          autoIncrement: false,
          allowNull: false,
          references: {
            model: 'profiles',
            key: 'id',
          }
        }
      }
    ); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users'); 
  }
};
