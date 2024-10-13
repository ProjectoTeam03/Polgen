'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('primer_fifth', [{
      val: "/5Am/",
			name: "5' Amino C6",
			category: "Attachment/linker",
			e260: 8400,
			mw: 995.03,
      costval: 69.0
    }, {
      val: "/5Bio/",
			name: "5' Biotin",
			category: "Attachment/linker",
			e260: 0,
			mw: 832.04,
      costval: 69.0
    }, {
      val: "/5Phos/",
			name: "5' Phosphate",
			category: "Phosphorylation",
			e260: 0,
			mw: 656.77,
      costval: 49.0
    }, {
      val: "/5FAM/",
			name: "5' 6-FAM",
			category: "Fluorophores",
			e260: 15700,
			mw: 843.94,
      costval: 59.0
    }, {
      val: "/5HEX/",
			name: "5' HEX",
			category: "Fluorophores",
			e260: 31600,
			mw: 1050.62,
      costval: 89.0
    }, {
      val: "/5TAMRA/",
			name: "5' TAMRA",
			category: "Fluorophores",
			e260: 31980,
			mw: 713.33,
      costval: 0.0
    }, {
      val: "/5YakYel/",
			name: "5' Yakima Yellow",
			category: "Fluorophores",
			e260: 23700,
			mw: 717.3,
      costval: 0.0
    }, {
      val: "/5THIOLC6/",
			name: "5' THIOL C6",
			category: "Attachment/linker",
			e260: 0,
			mw: 724.99,
      costval: 59.0
    }, {
      val: "/5CY5/",
			name: "5' CY5",
			category: "Fluorophores",
			e260: 10000,
			mw: 979.68,
      costval: 0.0
    }, {
      val: "/5CY3/",
			name: "5' CY3",
			category: "Fluorophores",
			e260: 4900,
			mw: 953.64,
      costval: 0.0
    }, {
      val: "/5deoxyl/",
			name: "INOSINE",
			category: "Mixed Base",
			e260: 0,
			mw: 754.83,
      costval: 19.0
    }, {
      val: "/5TET/",
			name: "5' TET",
			category: "Fluorophores",
			e260: 16300,
			mw: 981.73,
      costval: 0.0
    }, {
      val: "/5JOE/",
			name: "5' 6-JOE",
			category: "Fluorophores",
			e260: 20100,
			mw: 1008.0,
      costval: 119.0
    }, {
      val: "/5ATTO550/",
			name: "5' ATTO565",
			category: "Fluorophores",
			e260: 30600,
			mw: 492.6,
      costval: 0.0
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('primer_fifth', null, {});
  }
};
