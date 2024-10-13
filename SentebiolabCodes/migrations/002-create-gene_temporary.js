'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gene_temporary', {
      name: Sequelize.STRING(50),
      sequence: Sequelize.STRING(3000),
	  cost: Sequelize.FLOAT,
      userid: Sequelize.INTEGER,
	  orderitem: Sequelize.BOOLEAN
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gene_temporary');
  }
};
