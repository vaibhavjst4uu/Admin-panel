'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.ENUM('male', 'female', 'other'),
      allowNull: true,
      
    });
    await queryInterface.addColumn('Users', 'user_imgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'media', key: 'id' },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'gender');
    await queryInterface.removeColumn('Users', 'user_imgId');
  }
};
