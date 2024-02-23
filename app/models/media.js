'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  media.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg:"file name cannot be empty"},
      }
    },
    filepath:{
      type: DataTypes.STRING,
      unique:true,
      allowNull:false,
      validate:{
        notEmpty:{msg:'File path cannot be empty'},
      }
    },
    size: DataTypes.INTEGER,
    extension: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    uploadedBy: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps:false,
    modelName: 'media',
  });
  media.removeAttribute("createdBy");
  return media;
};