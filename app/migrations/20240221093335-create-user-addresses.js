'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:false
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull:false
      },
      locality: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull:false
      },
      landmark: {
        type: Sequelize.STRING,
        allowNull:true
      },
      alernate_phone: {
        type: Sequelize.STRING,
        allowNull:true
      },
      address_type: {
        type: Sequelize.ENUM( 'Home', 'Office' ),
        defaultValue:'Home'
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_addresses');
  }
};