'use strict';
module.exports = (sequelize, DataTypes) => {
  const supplier = sequelize.define('supplier', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  supplier.associate = function(models) {
    // associations can be defined here
    const {
      supplierproduct,
      product
    } = models;
    supplier.hasMany(supplierproduct);
    supplier.belongsToMany(product, {
      through: supplierproduct
    })
  };
  return supplier;
};