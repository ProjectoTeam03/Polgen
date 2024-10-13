'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('primer_sca', [{
      val: "50"
    }, {
      val: "100"
    }, {
      val: "200"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('primer_sca', null, {});
  }
};
