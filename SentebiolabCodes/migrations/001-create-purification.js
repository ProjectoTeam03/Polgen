'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('purification', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING(50)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('purification');
  }
};
