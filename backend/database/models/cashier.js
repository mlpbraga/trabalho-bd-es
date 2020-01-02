const validTypes = [
  'preferencial',
  'comum',
  'caixa rápido',
];

const validStatus = [
  'ativo',
  'inativo',
];

module.exports = (sequelize, DataTypes) => {
  const cashier = sequelize.define('cashier', {
    number: DataTypes.INTEGER,
    type: DataTypes.ENUM(validTypes),
    status: DataTypes.ENUM(validStatus),
    storeId: DataTypes.INTEGER
  }, {});
  cashier.associate = function(models) {
    // associations can be defined here
  };
  return cashier;
};