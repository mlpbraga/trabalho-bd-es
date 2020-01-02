const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        username: 'alealoi',
        employeeId: 2,
        password: bcrypt.hashSync('123'),
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'maria',
        password: bcrypt.hashSync('ml1234'),
        employeeId: 1,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'caio_octavio',
        password: bcrypt.hashSync('caio_octavio123'),
        employeeId: 3,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'alexandre_aloi',
        password: bcrypt.hashSync('alexandre_aloi123'),
        employeeId: 4,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'ale_aloi',
        password: bcrypt.hashSync('ale_aloi123'),
        employeeId: 5,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'jose_francisco',
        password: bcrypt.hashSync('jose_francisco123'),
        employeeId: 6,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'jeronimo_jamilo',
        password: bcrypt.hashSync('jeronimo_jamilo123'),
        employeeId: 7,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'ana_luiza',
        password: bcrypt.hashSync('ana_luiza123'),
        employeeId: 8,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'suamylly_martins',
        password: bcrypt.hashSync('suamylly_martins123'),
        employeeId: 9,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
      {
        username: 'maria_da',
        password: bcrypt.hashSync('maria_da123'),
        employeeId: 10,
        createdAt: new Date(2019, 0, 1),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface, Sequelize) => (queryInterface.dropTable('users')),
};
