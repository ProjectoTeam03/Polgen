'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('price', [{
      scale: "50 nmol",
      desalting: 0.29,
      opc: 0.39,
      hplc: 0.69
    }, {
      scale: "100 nmol",
      desalting: 0.39,
      opc: 0.49,
      hplc: 0.79
    }, {
      scale: "200 nmol",
      desalting: 0.49,
      opc: 0.59,
      hplc: 0.89
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('price', null, {});
  }
};
