const validShifts = [
  'matutino',
  'vespertino',
  'noturno',
];

module.exports = (sequelize, DataTypes) => {
  const usercashier = sequelize.define('usercashier', {
    cashierId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    shift: DataTypes.ENUM(validShifts)
  }, {});
  usercashier.associate = function(models) {
    // associations can be defined here
  };
  return usercashier;
};