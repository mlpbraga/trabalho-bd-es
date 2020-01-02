const validStatus = [
  'em avaliação',
  'confirmado',
  'a caminho',
  'cancelado',
  'entregue',
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM,
        values: validStatus,
        allowNull: false,
        validate: {
          isIn: {
            args: [validStatus],
            msg: 'order has invalid status value.',
          },
        },
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      supplierId: {
        type: Sequelize.INTEGER,
        references: { model: 'suppliers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('orders');
  }
};