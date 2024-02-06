'use strict';
const { Sequelize } = require("sequelize");

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
      // Roles.hasMany(
      //   models.role_has_permission,
      //   {
      //   foreignKey:"roleId",
      //   onDelete: 'CASCADE'
      //   }
      // );
    }

    // get createdAtValue() {
    //   // Return only the date part of createdAt
    //   return this.getDataValue('createdAt') ? this.getDataValue('createdAt').toISOString().split('T')[0] : null;
    // }
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
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      // get() {
      //   // Custom getter for createdAt
      //   return this.createdAtValue;
      // },
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};