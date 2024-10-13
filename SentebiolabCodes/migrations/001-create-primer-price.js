'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primer_price', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
      puriid: Sequelize.INTEGER,
      scaid: Sequelize.INTEGER,
      val: Sequelize.DOUBLE,
			couponid: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primer_price');
  }
};
