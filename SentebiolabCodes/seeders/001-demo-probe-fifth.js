'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('probe_fifth', [{
      val: "/5FAM/",
		name: "5' 6-FAM",
		category: "Fluorophores",
		e260: 15700,
		mw: 843.94
    }, {
      val: "/5HEX/",
		name: "5' HEX",
		category: "Fluorophores",
		e260: 31600,
		mw: 1050.62
    }, {
      val: "/5TAMRA/",
		name: "5' TAMRA",
		category: "Fluorophores",
		e260: 31980,
		mw: 713.33
    }, {
      val: "/5JOE/",
		name: "5' 6-JOE",
		category: "Fluorophores",
		e260: 20100,
		mw: 1008.0
    }, {
      val: "/5CY3/",
		name: "5' CY3",
		category: "Fluorophores",
		e260: 4900,
		mw: 953.64
    }, {
      val: "/5CY5/",
		name: "5' CY5",
		category: "Fluorophores",
		e260: 10000,
		mw: 979.68
    }, {
      val: "/5TET/",
		name: "5' TET",
		category: "Fluorophores",
		e260: 16300,
		mw: 981.73
    }, {
      val: "/5YakYel/",
		name: "5' Yakima Yellow",
		category: "Fluorophores",
		e260: 23700,
		mw: 717.3
    }, {
      val: "/5Phos/",
		name: "5' Phosphate",
		category: "Phosphorylation",
		e260: 0,
		mw: 656.77
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('probe_fifth', null, {});
  }
};