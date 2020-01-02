const validUnitFormats = [
  'quilo',
  'grama',
  'unidade',
];

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    unitFormat: DataTypes.ENUM(validUnitFormats),
  });
  product.associate = function(models) {
    const {
      orderproduct,
      storeproduct,
    } = models;
    // product.belongsToMany(orderproduct);
    // associations can be defined here
  };
  return product;
};