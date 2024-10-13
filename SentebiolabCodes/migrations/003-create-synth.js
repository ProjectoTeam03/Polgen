'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('synth', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
        name: Sequelize.STRING(100),
        date: Sequelize.DATE,
		type: Sequelize.STRING(20),
		
		///////
		
		scale: Sequelize.STRING(10),
		pcount: Sequelize.FLOAT,
		bp: Sequelize.INTEGER,
		
		dsltn: Sequelize.INTEGER,
		dsltaod: Sequelize.FLOAT,
		dsltanmol: Sequelize.FLOAT,
		
		opcn: Sequelize.INTEGER,
		opcaod: Sequelize.FLOAT,
		opcanmol: Sequelize.FLOAT,
		
		hplcn: Sequelize.INTEGER,
		hplcaod: Sequelize.FLOAT,
		hplcanmol: Sequelize.FLOAT,
		
		minod: Sequelize.FLOAT,
		maxod: Sequelize.FLOAT,
		minnmol: Sequelize.FLOAT,
		maxnmol: Sequelize.FLOAT,
		
		fill: Sequelize.FLOAT,
		repeat: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('synth');
  }
};
