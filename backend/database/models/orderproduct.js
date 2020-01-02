'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderproduct = sequelize.define('orderproduct', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.DOUBLE,
    sellin: DataTypes.DOUBLE
  }, {});
  orderproduct.associate = function(models) {
    const {
      order,
      product,
    } = models;
    orderproduct.belongsTo(order);
    orderproduct.belongsTo(product);

    // associations can be defined here
  };
  return orderproduct;
};