'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },

      description: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'users', // user table
          key:'id'   // users.id
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'users', // user table
          key:'id'   // users.id
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      status:{
        type:Sequelize.TINYINT,
        allowNull:false,
        defaultValue:1    
      },
      metadata:{
        type: Sequelize.BLOB,
        allowNull:true
      },
      brandId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"brands",
          key:"id"
        }
      },
      categoryId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"categories",
          key:"id"
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};