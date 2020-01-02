'use strict';
module.exports = (sequelize, DataTypes) => {
  const storeproduct = sequelize.define('storeproduct', {
    stock: DataTypes.DOUBLE,
    sellout: DataTypes.DOUBLE,
    storeId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  storeproduct.associate = function(models) {
    const { product } = models;
    storeproduct.belongsTo(product)
    // associations can be defined here
  };
  return storeproduct;
};