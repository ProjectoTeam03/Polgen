'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primer_temporary', {
      name: Sequelize.STRING(50),
      sequence: Sequelize.STRING(250),
      fmod: Sequelize.INTEGER,
      tmod: Sequelize.INTEGER,
	  purification: Sequelize.INTEGER,
	  scale: Sequelize.INTEGER,
	  cost: Sequelize.FLOAT,
      userid: Sequelize.INTEGER,
	  orderitem: Sequelize.BOOLEAN
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primer_temporary');
  }
};
