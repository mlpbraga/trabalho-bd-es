module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    employeeId: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    const {
      employee
    } = models;
    user.belongsTo(
      employee,
      { foreignKey: 'employeeId' }
    );
    // associations can be defined here
  };
  return user;
};