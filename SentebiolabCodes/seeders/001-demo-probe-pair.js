'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('probe_pair', [{
      fmodid: 1,
      tmodid: 1,
      val: 159
    }, {
	  fmodid: 1,
      tmodid: 2,
      val: 159
	}, {
	  fmodid: 1,
      tmodid: 3,
      val: 159
	}, {
	  fmodid: 1,
      tmodid: 4,
      val: 0
	}, {
	  fmodid: 2,
      tmodid: 1,
      val: 179
	}, {
	  fmodid: 2,
      tmodid: 2,
      val: 179
	}, {
	  fmodid: 2,
      tmodid: 3,
      val: 179
	}, {
	  fmodid: 2,
      tmodid: 4,
      val: 0
	}, {
	  fmodid: 3,
      tmodid: 3,
      val: 0
	}, {
	  fmodid: 3,
      tmodid: 4,
      val: 0
	}, {
	  fmodid: 4,
      tmodid: 1,
      val: 0
	}, {
	  fmodid: 4,
      tmodid: 3,
      val: 0
	}, {
	  fmodid: 4,
      tmodid: 4,
      val: 0
	}, {
	  fmodid: 5,
      tmodid: 2,
      val: 0
	}, {
	  fmodid: 5,
      tmodid: 3,
      val: 0
	}, {
	  fmodid: 6,
      tmodid: 3,
      val: 0
	}, {
	  fmodid: 7,
      tmodid: 1,
      val: 0
	}, {
	  fmodid: 7,
      tmodid: 2,
      val: 0
	}, {
	  fmodid: 7,
      tmodid: 3,
      val: 0
	}, {
	  fmodid: 7,
      tmodid: 4,
      val: 0
	}, {
	  fmodid: 8,
      tmodid: 1,
      val: 0
	}, {
	  fmodid: 8,
      tmodid: 2,
      val: 0
	}, {
	  fmodid: 8,
      tmodid: 3,
      val: 0
	}, {
	  fmodid: 9,
      tmodid: 5,
      val: 0
	}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('probe_pair', null, {});
  }
};