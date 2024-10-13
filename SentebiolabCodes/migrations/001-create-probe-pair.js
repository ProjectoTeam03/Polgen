'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('probe_pair', {
			id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fmodid: Sequelize.INTEGER,
      tmodid: Sequelize.INTEGER,
      val: Sequelize.DOUBLE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('probe_pair');
  }
};
