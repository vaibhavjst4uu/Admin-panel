'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      //Add seed commands here.
     
      //Example:
      await queryInterface.bulkInsert('Users', [{
        name: 'Vaibhav Raj',
        email:'vaibhavjst4uu@gmail.com',
        password:"Vaibhav6898@",
        mobile:"9113392709"
        
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
