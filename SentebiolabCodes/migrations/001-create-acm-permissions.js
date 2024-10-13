'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('acm_permissions', {
      roleid: {
        type: Sequelize.INTEGER
      },
      resource: {
        type: Sequelize.STRING(50)
      },
      permname: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('acm_permissions');
  }
};