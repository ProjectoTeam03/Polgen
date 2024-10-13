'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sequence', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
		name: Sequelize.STRING(80),
		type: Sequelize.STRING(30),
		cons: Sequelize.FLOAT,
		size: Sequelize.INTEGER,
		pname: Sequelize.STRING(80),
		pcons: Sequelize.FLOAT,
		puri: Sequelize.BOOLEAN,
		cost: Sequelize.FLOAT,
		orderid: Sequelize.INTEGER,
		ordered: Sequelize.BOOLEAN,
		userid: Sequelize.INTEGER,
		fasta: Sequelize.STRING(50000),
		trackingid: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sequence');
  }
};
