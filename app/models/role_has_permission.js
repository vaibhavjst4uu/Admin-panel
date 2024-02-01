'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_has_permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role_has_permission.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'uniqueRolePermission', // Set the same unique constraint name
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      unique:'uniqueRolePermission'// Specify the unique constraint name
    }
  }, {
    sequelize,
    modelName: 'role_has_permission',

  });
  return role_has_permission;
};