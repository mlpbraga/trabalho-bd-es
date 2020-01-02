'use strict';
module.exports = (sequelize, DataTypes) => {
  const employeestore = sequelize.define('employeestore', {
    employeeId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    entryTime: DataTypes.DATE,
    exitTime: DataTypes.DATE
  }, {});
  employeestore.associate = function(models) {
    // associations can be defined here
  };
  return employeestore;
};