'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('price', {
      scale: Sequelize.STRING(50),
      desalting: Sequelize.FLOAT,
      opc: Sequelize.FLOAT,
      hplc: Sequelize.FLOAT
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('price');
  }
};
