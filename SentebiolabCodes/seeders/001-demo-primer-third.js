'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('primer_third', [{
      val: "/3Bio/",
			name: "3' Biotin",
			category: "Attachment/linker",
			e260: 0,
			mw: 759.93,
      costval: 0.0
    }, {
      val: "/3TAMRA/",
			name: "3' TAMRA",
			category: "Fluorophores",
			e260: 31980,
			mw: 713.33,
      costval: 0.0
    }, {
      val: "/3Phos/",
			name: "3' Phosphate",
			category: "Phosphorylation",
			e260: 0,
			mw: 656.77,
      costval: 49.0
    }, {
      val: "/3THIOLC6/",
			name: "3' THIOL C6",
			category: "Attachment/linker",
			e260: 0,
			mw: 328.4,
      costval: 0.0
    }, {
      val: "/3Am/",
			name: "3' Amino",
			category: "Attachment/linker",
			e260: 8400,
			mw: 995.03,
      costval: 0.0
    }, {
      val: "/3ATTO550/",
		name: "3' ATTO550",
		category: "Fluorophores",
		e260: 31400,
		mw: 576.8,
      costval: 0.0
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('primer_third', null, {});
  }
};
