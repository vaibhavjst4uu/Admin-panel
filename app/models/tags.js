'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tags.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notEmpty:{msg:"Tag name cannot be empty"},
    },
    },
    description: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    status:{
      type:DataTypes.TINYINT,
      defaultValue:1,
      validate:{
        isIn: {
          args: [[0, 1]],
          msg: "Must be either 1 for `active` or  0 for `inactive`",
        },// Enforces the value
      } 
    }
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};