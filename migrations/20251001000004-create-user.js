'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      token_update: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      roleId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
