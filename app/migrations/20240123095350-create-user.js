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
        allowNull: false,

        validate:{
            notEmpty:{msg:"Name cannot be empty"},
        },        
      },
      email: {
        type: Sequelize.STRING,
        unique:{
          args: true,
          msg :"Email is already in use."
      },  //email should be unique for every user
      allowNull:false,
      validate:{
          isEmail:{
              msg :"Please enter a valid Email Id",
          },
          notEmpty:{msg:"Email cannot be empty"},
      },
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            isStrongPassword(value) {
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;.?~\\/-]).{5,15}/.test(value)) {
                  throw new Error("Password must have 1 lowercase, 1 uppercase, 1 special character, and be 5-10 characters long.");
                }
                if(/<[^>]*>/.test(value)){
                  throw new Error("warning your Password should not contains HTML tags");
                }
            },
            notEmpty:{msg: "Password cannot be empty"},
        },        
      },
      mobile: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: {
            args:true,
            msg:"User with this mobile number already exists" 
        },
        validate:{
          len:{
            args:[10,10],
            msg:"Mobile Number must be of length 10"
          }
        }
      },
      status: {
        type: Sequelize.ENUM('active','inactive'),
        validate:{
          isIn: {
            args: [['active', 'inactive']],
            msg: "Must be either `active` or `inactive`"
          },// Enforces the value

        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};