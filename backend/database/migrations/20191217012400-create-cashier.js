const validTypes = [
  'preferencial',
  'comum',
  'caixa rápido',
];

const validStatus = [
  'ativo',
  'inativo',
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cashiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: validTypes,
        allowNull: false,
        validate: {
          isIn: {
            args: [validTypes],
            msg: 'cashier has invalid type value.',
          },
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: validStatus,
        allowNull: false,
        validate: {
          isIn: {
            args: [validStatus],
            msg: 'cashier has invalid status value.',
          },
        },
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: { model: 'stores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('cashiers');
  }
};