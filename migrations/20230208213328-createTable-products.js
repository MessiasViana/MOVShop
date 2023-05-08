'use strict';

const DataTypes = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'products',
      {
        id_product: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        producer: {
          type: DataTypes.STRING,
          allowNull: false
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      }, {
        timestamps: true,
        tableName: 'products',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
