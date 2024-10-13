'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING(50),
      mail: Sequelize.STRING(100),
      company: Sequelize.STRING(100),
      department: Sequelize.STRING(100),
      door: Sequelize.STRING(50),
      address: Sequelize.STRING(500),
      phone: Sequelize.STRING(50),
      userid: Sequelize.INTEGER,
	  couponid: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	  }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
