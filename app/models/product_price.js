'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Belongs-To association with Products
      this.belongsTo(models.Products, { foreignKey: "productId" });
    }
  }
  product_price.init({
    productId:{
      type: DataTypes.INTEGER,
      allowNull:false,

    },
    price: DataTypes.FLOAT,
    createdBy: DataTypes.INTEGER,
    status:{
      type: DataTypes.TINYINT,
      defaultValue:1,
      validate:{
        isIn:{
          args:[[0,1]],
          msg: "Must be either 1 for `active` or  0 for `inactive`",
        }
      }
    }
  }, {
    sequelize,
    modelName: 'product_price',
  });
  return product_price;
};