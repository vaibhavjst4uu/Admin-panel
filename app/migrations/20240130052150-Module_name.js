'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Permissions', 'Module_name', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this based on your requirements
      
      set(value) {
        // Convert the input value to uppercase
        return value.toUpperCase();
      }      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Permissions', 'Module_name');

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
