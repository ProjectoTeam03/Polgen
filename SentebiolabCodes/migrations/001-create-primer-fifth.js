'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primer_fifth', {
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
			mw: Sequelize.DOUBLE,
      costval: Sequelize.DOUBLE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primer_fifth');
  }
};
