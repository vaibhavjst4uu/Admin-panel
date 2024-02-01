'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_has_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      permissionId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
        // Add unique constraint for the combination of roleId and permissionId
        // await queryInterface.addConstraint('role_has_permissions', {
        //   type: 'unique',
        //   fields: ['roleId', 'permissionId'],
        //   name: 'uniqueRolePermission',
        // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_has_permissions');
  }
};