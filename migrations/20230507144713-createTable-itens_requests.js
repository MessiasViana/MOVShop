'use strict';

const DataTypes = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'itens_requests',
      {
        id_itens_requests: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        id_product: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id_product',
          }
        },
        id_request: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'requests',
            key: 'id_request',
          }
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {
        tableName: 'itens_requests',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('itens_requests');
  }
};
