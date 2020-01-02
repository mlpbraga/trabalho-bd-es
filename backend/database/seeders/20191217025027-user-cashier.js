'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('usercashiers',
    [
      {
        cashierId: 1,
        userId: 1,
        shift: 'matutino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 1,
        userId: 1,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 2,
        userId: 1,
        shift: 'matutino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 1,
        userId: 4,
        shift: 'matutino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 16,
        userId: 4,
        shift: 'noturno',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 2,
        userId: 5,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 8,
        userId: 5,
        shift: 'matutino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 5,
        userId: 6,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },

      {
        cashierId: 9,
        userId: 6,
        shift: 'matutino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 12,
        userId: 7,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 15,
        userId: 8,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 16,
        userId: 9,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        cashierId: 16,
        userId: 10,
        shift: 'vespertino',
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },

    ]),

  down: (queryInterface, Sequelize) => (queryInterface.dropTable('usercashiers')),
};