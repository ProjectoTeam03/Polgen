'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('billingaddress', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      taxoffice: Sequelize.STRING(50),
      taxnumber: Sequelize.STRING(50),
      address: Sequelize.STRING(500),
      project: Sequelize.STRING(50),
      natid: Sequelize.STRING(50),
      phone: Sequelize.STRING(50),
      mail: Sequelize.STRING(100),
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: "acm_users",
          key: "id"
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('billingaddress');
  }
};
