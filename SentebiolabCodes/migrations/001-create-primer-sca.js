'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primer_sca', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      val: Sequelize.STRING(25)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primer_sca');
  }
};
