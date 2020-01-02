const validStatus = [
  'em avaliação',
  'confirmado',
  'a caminho',
  'cancelado',
  'entregue',
];

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    status: DataTypes.ENUM(validStatus),
    orderDate: DataTypes.DATE,
    deliveryDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
  }, {});
  order.associate = function(models) {
    const {
      user,
      orderproduct,
      product,
    } = models;
    order.belongsTo(user);
    order.hasMany(orderproduct);
    // associations can be defined here
  };
  return order;
};