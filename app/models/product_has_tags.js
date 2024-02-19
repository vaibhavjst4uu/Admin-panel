"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_has_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Products, { foreignKey: 'productId' });
    }
  }
  product_has_tags.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tagId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "product_has_tags",
    }
  );
  product_has_tags.removeAttribute("id");
  return product_has_tags;
};
