const _ = require('lodash');

const validRoles = [
  'embalador',
  'operador de caixa',
  'repositor',
  'balconista',
  'auxiliar',
  'subgerente',
  'gerente'
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING(8),
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: 'Invalid RG. It must not have special characters.',
          },
        },
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        validate: {
          len: {
            args: [11],
            msg: 'Invalid CPF. It must not have special characters.',
          },
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      role: {
        type: Sequelize.ENUM,
        values: validRoles,
        allowNull: false,
        validate: {
          isIn: {
            args: [validRoles],
            msg: 'employees has invalid role value.',
          },
        },
      },
      salary: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('employees');
  }
};