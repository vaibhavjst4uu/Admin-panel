'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'products',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      mediaId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'media',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      isFeatured: {
        type: Sequelize.TINYINT,
        defaultValue:0
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_images');
  }
};