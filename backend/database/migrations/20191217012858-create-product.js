const validUnitFormats = [
  'quilo',
  'grama',
  'unidade',
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitFormat: {
        type: Sequelize.ENUM,
        values: validUnitFormats,
        allowNull: false,
        validate: {
          isIn: {
            args: [validUnitFormats],
            msg: 'product has invalid unit format value.',
          },
        },
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
    return queryInterface.dropTable('products');
  }
};