'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schedule', {
      mon: Sequelize.STRING(50),
      tue: Sequelize.STRING(50),
      wed: Sequelize.STRING(50),
      thu: Sequelize.STRING(50),
      fri: Sequelize.STRING(50)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('schedule');
  }
};
