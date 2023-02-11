'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'products',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false
        }
      }, {
        timestamps: false,
        tableName: 'products',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
