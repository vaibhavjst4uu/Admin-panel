"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One-to-One with ProductQuantity
      this.hasOne(models.product_quantity, { foreignKey: "productId" });

      // One-to-Many with ProductImages
      this.hasMany(models.product_images, { foreignKey: "productId" });

      // One-to-Many with ProductPrice
      this.hasMany(models.product_price, {
        as: "product_prices",
        foreignKey: "productId",
      });

      // One-to-Many with Product_has_tags
      this.hasMany(models.product_has_tags, {
        as: "productTags",
        foreignKey: "productId",
      });

      // Many-to-Many with Tags through product_has_tags
      this.belongsToMany(models.Tags, {
        through: models.product_has_tags,
        // foreignKey: "productId",
        // otherKey: "tagId",
        // as:"productTags"
      });
    }
  }
  Products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Product name cannot be empty" },
        },
      },

      description: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        validate: {
          isIn: {
            args: [[0, 1]],
            msg: "Must be either 1 for `active` or  0 for `inactive`",
          },
        },
      },
      metadata: {
        type: DataTypes.BLOB,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Brand cannot be empty" },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Category cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
