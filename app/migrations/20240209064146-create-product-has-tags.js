'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_has_tags', {

      productId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: "products",
          key:"id"
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: "tags",
          key:"id"
        }
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_has_tags');
  }
};