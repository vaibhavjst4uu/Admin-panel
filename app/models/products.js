'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notEmpty:{msg:"Product name cannot be empty"},
      }
    },

    description: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    status:{
      type:DataTypes.TINYINT,
      defaultValue:1,
      validate:{
        isIn:{
          args:[[0,1]],
          msg: "Must be either 1 for `active` or  0 for `inactive`",
        }
      }
    },
    metadata:{
      type:DataTypes.BLOB,
    },
    brandId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Brand cannot be empty"}
      }
    },
    categoryId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Category cannot be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};