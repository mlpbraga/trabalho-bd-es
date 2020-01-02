const validRoles = [
  'embalador',
  'operador de caixa',
  'repositor',
  'balconista',
  'auxiliar',
  'subgerente',
  'gerente'
];

module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define('employee', {
    name: DataTypes.STRING,
    rg: DataTypes.STRING,
    cpf: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    role: DataTypes.ENUM(validRoles),
    salary: DataTypes.DOUBLE
  }, {});
  employee.associate = function(models) {
    const {
      user
    } = models;

    employee.hasOne(user, { foreignKey: 'id' });
    // associations can be defined here
  };
  return employee;
};