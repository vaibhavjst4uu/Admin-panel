'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      filepath: {
        type: Sequelize.STRING,
        allowNull:false
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      extension: {
        type: Sequelize.STRING,
        allowNull:false
      },

      uploadedBy: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('media');
  }
};