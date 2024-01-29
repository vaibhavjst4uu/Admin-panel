'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        unique:{
          args: true,
          msg :"Email is already in use."
      },  //email should be unique for every user
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: {
          args:true,
          msg:"User with this mobile number already exists" 
      },
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue:1
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
        // allowNull:true

      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull:true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};