'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('primer_control', [
	{
      name: "BetaActinmRNAF",
      sequence: "TTCCTGGGCATGGAGTCCT",
      fmod: null,
      tmod: null,
      purification: 1,
      scale: 1
			
    }, {
      name: "BetaActinmRNAR",
      sequence: "AGGAGGAGCAATGATCTTGATC",
      fmod: null,
      tmod: null,
      purification: 1,
      scale: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('primer_control', null, {});
  }
};
