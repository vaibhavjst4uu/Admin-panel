'use strict';
const { Sequelize } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Permissions.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    createdAt:{
      type:DataTypes.DATE,
      defaultValue:Sequelize.fn('NOW'),
    }
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permissions;
};