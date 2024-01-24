'use strict';
const { Sequelize } = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roles.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    createdAt:{
      type:DataTypes.DATE,
      defaultValue: Sequelize.fn('NOW'),
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};