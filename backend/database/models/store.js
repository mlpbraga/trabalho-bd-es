'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    timestamps: true
  });
  store.associate = function(models) {
    // associations can be defined here
    const {
      cashier,
    } = models;
    store.hasMany(cashier);
  };
  return store;
};