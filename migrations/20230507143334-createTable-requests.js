'use strict';

const DataTypes = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'requests',
      {
        id_request: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price_total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        id_user: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id_user',
          }
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
      }, {
        timestamps: false,
        tableName: 'requests',
        createdAt: 'created_at',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('requests');
  }
};
