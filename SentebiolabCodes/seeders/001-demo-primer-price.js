'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('primer_price', [{
      puriid: 1,
      scaid: 1,
      val: 0.29,
			couponid: 1
    }, {
	  puriid: 1,
      scaid: 2,
      val: 0.39,
			couponid: 1
	}, {
	  puriid: 1,
      scaid: 3,
      val: 0.49,
			couponid: 1
	}, {
	  puriid: 2,
      scaid: 1,
      val: 0.39,
			couponid: 1
	}, {
	  puriid: 2,
      scaid: 2,
      val: 0.49,
			couponid: 1
	}, {
	  puriid: 2,
      scaid: 3,
      val: 0.59,
			couponid: 1
	}, {
	  puriid: 3,
      scaid: 1,
      val: 0.69,
			couponid: 1
	}, {
	  puriid: 3,
      scaid: 2,
      val: 0.79,
			couponid: 1
	}, {
	  puriid: 3,
      scaid: 3,
      val: 0.89,
			couponid: 1
	}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('primer_price', null, {});
  }
};
