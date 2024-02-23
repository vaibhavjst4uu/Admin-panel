'use strict';
const { Sequelize } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(
      //   models.user_has_role,
      //   {
      //     foreignKey: "userId",
      //     onDelete:"CASCADE"
      //   }
      // );

      this.belongsToMany(models.Roles, {
        through: models.user_has_role,
        // foreignKey: 'UserId',
        // as:"userRole"
      });
    }

    // get createdAtValue() {
    //   // Return only the date part of createdAt
    //   return this.getDataValue('createdAt') ? this.getDataValue('createdAt').toISOString().split('T')[0] : null;
    // }
  }
  User.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Name cannot be empty"},
    },      
    },
    email:{
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg :"Email is already in use."
    },
    allowNull: false,
    validate:{
      isEmail:{
          msg :"Please enter a valid Email Id",
      },
      notEmpty:{msg:"Email cannot be empty"},
  },    
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
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
    mobile:{
      type: DataTypes.STRING,
      allowNull:false,
      unique: {
        args:true,
        msg:"User with this mobile number already exists" 
    },      
    validate:{
      len:{
        args:[10,10],
        msg:"Mobile Number must be of length 10"
      },
      notEmpty:{msg: "Contact cannot be empty"},      
    }    
    },
    status:{
      type: DataTypes.TINYINT,
      defaultValue:1,
      validate:{
        isIn: {
          args: [[1, 2]],
          msg: "Must be either 1 for `active` or  2 for `inactive`",
        },// Enforces the value

      }      
    },
    deletedAt:{
      type: DataTypes.DATE,
      defaultValue:null,
    },
    createdAt:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      // get() {
      //   // Custom getter for createdAt
      //   return this.createdAtValue;
      // },
    },
    gender:{
      type:DataTypes.ENUM('male','female', 'other'),
    },
    user_imgId:{
      type:DataTypes.INTEGER
    }


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};