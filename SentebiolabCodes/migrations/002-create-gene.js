'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('gene', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: Sequelize.STRING(50),
		sequence: Sequelize.STRING(3000),
		cost: Sequelize.FLOAT,
		orderid: Sequelize.INTEGER,
		userid: Sequelize.INTEGER,
		trackingid: Sequelize.INTEGER,
		completed: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('gene');
  }
};
