'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('probe_third', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      val: Sequelize.STRING(25),
	  name: Sequelize.STRING(50),
		category: Sequelize.STRING(50),
		e260: Sequelize.INTEGER,
		mw: Sequelize.DOUBLE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('probe_third');
  }
};
