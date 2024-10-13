'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('coupon', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: Sequelize.STRING(100)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('coupon');
  }
};
