const validShifts = [
  'matutino',
  'vespertino',
  'noturno',
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usercashiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cashierId: {
        type: Sequelize.INTEGER,
        references: { model: 'cashiers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      shift: {
        type: Sequelize.ENUM,
        values: validShifts, 
        allowNull: false,
        validate: {
          isIn: {
            args: [validShifts],
            msg: 'usercashier has invalid shift value.',
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
    return queryInterface.dropTable('usercashiers');
  }
};