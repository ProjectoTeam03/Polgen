'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
	{
		id:0,
		ordernum: "Kontrol",
		orderdone: true,
		approval: true,
		createdAt: new Date(),
		updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {});
  }
};
