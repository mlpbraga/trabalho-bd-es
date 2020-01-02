module.exports = (sequelize, DataTypes) => {
  const cashierproduct = sequelize.define('cashierproduct', {
    cashierId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    sellDate: DataTypes.DATE,
    quantity: DataTypes.DOUBLE,
    sellout: DataTypes.DOUBLE
  }, {});
  cashierproduct.associate = function(models) {
    // associations can be defined here
  };
  return cashierproduct;
};