'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('acm_roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(50)
      },
      mainpage: {
        type: Sequelize.STRING(50)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('acm_roles');
  }
};
