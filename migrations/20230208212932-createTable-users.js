'use strict';

const DataTypes = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id_user: {
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
        birthday: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        id_profile: {
          type: DataTypes.INTEGER,
          autoIncrement: false,
          allowNull: false,
          references: {
            model: 'profiles',
            key: 'id_profile',
          }
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
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    ); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users'); 
  }
};
