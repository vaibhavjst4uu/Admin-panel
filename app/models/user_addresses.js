'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_addresses.init({
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    fullname:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:" Full Name cannot be empty"},
    },
    },
    phone: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args:[10,10],
          msg:"Phone Number must be of length 10"
        },
        notEmpty:{msg: "phone cannot be empty"},      
      } 
    },
    pincode:{
      type: DataTypes.STRING,
      validate:{
        len:{
          args:[6,6],
          msg:"Pincode must be of length 6"
        },
        notEmpty:{msg: "pincode cannot be empty"},      
      } 
    },
    locality:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Locality cannot be empty"},
    },
    },
    address:{
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Address cannot be empty"},
    },
    },
    city:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Name cannot be empty"},
    },
    },
    state:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"City cannot be empty"},
    },
    },
    landmark:{
      type:DataTypes.STRING,
      allowNull:true,

    },
    alernate_phone:{
      type: DataTypes.STRING,
      allowNull:true,
      validate:{
        len:{
          args:[10,10],
          msg:"Alternate Number must be of length 10"
        },     
      } 
    },
    address_type:{
      type:DataTypes.ENUM('Home','Office'),
      defaultValue: 'Home',
      validate:{
        isIn: {
            args: [['Home', 'Office']],
            msg: "Must be either 'Home' or 'Office'"
        },
      }
    },
    isDefault:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
      validate:{
        isIn: {
            args: [[true, false]],
            msg: "Must be either true or false"
        },
      }

    }
  }, {
    sequelize,
    modelName: 'user_addresses',
  });
  return user_addresses;
};