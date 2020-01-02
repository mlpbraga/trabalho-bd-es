'use strict';
module.exports = (sequelize, DataTypes) => {
  const supplierproduct = sequelize.define('supplierproduct', {
    productId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
    sellin: DataTypes.DOUBLE
  }, {});
  supplierproduct.associate = function(models) {
    // associations can be defined here
    const {
      supplier,
      product,
    } = models;
    supplierproduct.belongsTo(supplier);
    supplierproduct.belongsTo(product);
  };
  return supplierproduct;
};