module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('suppliers',
    [
      {
        name: 'fornecedor 1',
        address: 'rua dos bobos numero 2',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'fornecedor 2',
        address: 'rua dos bobos numero zero',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'fornecedor 3',
        address: 'rua dos bobos numero 2',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface, Sequelize) => (queryInterface.dropTable('suppliers')),
};
