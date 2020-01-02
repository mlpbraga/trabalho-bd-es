module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('stores',
  [
    {
      name: 'loja 1',
      address: 'rua dos bobos, numero zero',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'loja 2',
      address: 'rua dos bobos, numero tres',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'loja 3',
      address: 'rua dos marombas, numero dois',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => (queryInterface.dropTable('stores')),
};
