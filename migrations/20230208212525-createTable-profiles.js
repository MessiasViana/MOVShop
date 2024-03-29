'use strict';

const DataTypes = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'profiles',
      {
        id_profile: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        profile: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, {
        timestamps: true,
        tableName: 'profiles',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('profiles')
  }
};
