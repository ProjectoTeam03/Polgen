'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('purification', [{
      id: 1,
      name: "DSLT"
    }, {
			id: 2,
      name: "OPC"
		}, {
			id: 3,
      name: "HPLC"
		}
		], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('purification', null, {});
  }
};
