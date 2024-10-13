'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('probe_control', [{
      name: "beta actin probe ( FAM/tamra)",
      sequence: "CCACGAAACTACCTTCAACTCC",
      fmod: 1,
      tmod: 1,
      purification: 3,
      scale: 3
			
    }, {
      name: "beta actin probe (FAM-BHQ1)",
      sequence: "CCACGAAACTACCTTCAACTCC",
      fmod: 1,
      tmod: 2,
      purification: 3,
      scale: 3
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('probe_control', null, {});
  }
};
