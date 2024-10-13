'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('probe_third', [{
      val: "/3TAMRA/",
		name: "3' TAMRA",
		category: "Fluorophores",
		e260: 31980,
		mw: 713.33
    }, {
      val: "/BHQ-1/",
	    name: "Black Hole Quencher 1",
		category: "Dark Quenchers",
	    e260: 8000,
	    mw: 554.49
    }, {
      val: "/BHQ-2/",
	    name: "Black Hole Quencher 2",
		category: "Dark Quenchers",
	    e260: 8000,
	    mw: 556.46
    }, {
      val: "/Dab/",
	    name: "3' Dabcyl",
		category: "Dark Quenchers",
		e260: 7283,
		mw: 340.14
    }, {
      val: "/3ATTO550/",
		name: "3' ATTO550",
		category: "Fluorophores",
		e260: 31400,
		mw: 576.8
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('probe_third', null, {});
  }
};