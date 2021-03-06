module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('orderproducts',
    [
      {
        orderId: 1,
        productId: 1,
        quantity: 1.6,
        sellin: 5.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 0.4,
        sellin: 5.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 3,
        quantity: 3,
        sellin: 7.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 0.5,
        sellin: 5.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 3,
        quantity: 40,
        sellin: 3.5,
        createdAt: new Date(2019, 2, 5),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 4,
        quantity: 40,
        sellin: 3.5,
        createdAt: new Date(2019, 2, 5),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 5,
        quantity: 25,
        sellin: 5.0,
        createdAt: new Date(2019, 2, 5),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 6,
        quantity: 27.5,
        sellin: 6.0,
        createdAt: new Date(2019, 2, 5),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 7,
        quantity: 100.0,
        sellin: 1.75,
        createdAt: new Date(2019, 2, 5),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 8,
        quantity: 20,
        sellin: 5.5,
        createdAt: new Date(2019, 2, 5),
        updatedAt: new Date(),
      },
      {
        orderId: 4,
        productId: 9,
        quantity: 20,
        sellin: 5.5,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 4,
        productId: 10,
        quantity: 50.2,
        sellin: 27.75,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 4,
        productId: 11,
        quantity: 10,
        sellin: 25.5,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 4,
        productId: 12,
        quantity: 30,
        sellin: 4,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 4,
        productId: 13,
        quantity: 30,
        sellin: 5.15,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 5,
        productId: 14,
        quantity: 25.50,
        sellin: 5.25,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 5,
        productId: 15,
        quantity: 150,
        sellin: 3.5,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 5,
        productId: 16,
        quantity: 10.2,
        sellin: 1.75,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
      {
        orderId: 5,
        productId: 17,
        quantity: 10.5,
        sellin: 3,
        createdAt: new Date(2019, 2, 15),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface, Sequelize) => (queryInterface.dropTable('orderproducts')),
};
