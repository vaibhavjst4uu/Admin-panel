'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_has_permissions', {

      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Roles',// The name of the referenced table
          key:'id', //The name of the referenced column
        },
        onDelete: 'CASCADE', // Specify the desired onDelete behavior
        onUpdate: 'CASCADE'
      },
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Permissions',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
      },

    });

        // // Add the foreign key constraint
        // await queryInterface.addConstraint('role_has_permissions', {
        //   fields: ['roleId'],
        //   type: 'foreign key',
        //   name: 'fk_role_has_permission_role', // Provide a unique constraint name
        //   references: {
        //     table: 'Roles',
        //     field: 'id',
        //   },
        //   onDelete: 'CASCADE', // Specify the desired onDelete behavior
        // });

        // await queryInterface.addConstraint('role_has_permissions',{
        //   fields:['permissionId'],
        //   type: 'foreign key',
        //   name: 'fk_role_has_permission_permission',
        //   references: {
        //     table: 'Permissions',
        //     field: 'id'
        //   },
        //   onDelete:'CASCADE',
        // })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_has_permissions');
  }
};