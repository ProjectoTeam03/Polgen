'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('primer_puri', [{
      val: "DSLT"
    }, {
      val: "OPC"
    }, {
      val: "HPLC"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('primer_puri', null, {});
  }
};
