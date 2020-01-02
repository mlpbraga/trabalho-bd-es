module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('products',
    [
      {
        name: 'banana grande',
        unitFormat: 'quilo',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'banana maçã',
        unitFormat: 'quilo',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'coca cola 1 litro',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'fanta laranja 1 litro',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'coca cola lata',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'maçã',
        unitFormat: 'quilo',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'aveia a granel',
        unitFormat: 'grama',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'leite líquido',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'iogurte líquido',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'carne bovina',
        unitFormat: 'quilo',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'fralda pampers',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'detergente',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'óleo de soja',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'batata doce',
        unitFormat: 'quilo',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'cerveja skol lata',
        unitFormat: 'unidade',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'cheiro verde',
        unitFormat: 'grama',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        name: 'tomate',
        unitFormat: 'quilo',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface, Sequelize) => (queryInterface.dropTable('products')),
};