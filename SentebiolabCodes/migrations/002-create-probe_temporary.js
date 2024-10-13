'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('probe_temporary', {
      name: Sequelize.STRING(50),
      sequence: Sequelize.STRING(250),
      fmod: Sequelize.INTEGER,
      tmod: Sequelize.INTEGER,
	  cost: Sequelize.FLOAT,
      userid: Sequelize.INTEGER,
	  orderitem: Sequelize.BOOLEAN
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('probe_temporary');
  }
};
