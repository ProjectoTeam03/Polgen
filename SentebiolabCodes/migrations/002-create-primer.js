'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING(90),
      sequence: Sequelize.STRING(250),
      fmod: {
        type: Sequelize.INTEGER,
        references: {
          model: "primer_fifth",
          key: "id"
        }
      },
      tmod: {
        type: Sequelize.INTEGER,
        references: {
          model: "primer_third",
          key: "id"
        }
      },
			purification: {
				type: Sequelize.INTEGER,
				references: {
					model: "primer_puri",
					key: "id"
				}
			},
			scale: {
				type: Sequelize.INTEGER,
				references: {
					model: "primer_sca",
					key: "id"
				}
			},
			cost: Sequelize.FLOAT,
      inozine: Sequelize.STRING(80),
      synthno: Sequelize.STRING(100), // They're using this as date as well
      dmt: Sequelize.BOOLEAN,
      a260: Sequelize.FLOAT,
      tmbasic: Sequelize.STRING(25),
      mw: Sequelize.FLOAT,
      conc: Sequelize.FLOAT,
      totalng: Sequelize.FLOAT,
      od: Sequelize.FLOAT,
      totalnmol: Sequelize.FLOAT,
      synthdate: Sequelize.DATE,
      orderid: Sequelize.INTEGER,
      userid: Sequelize.INTEGER,
	synthid: Sequelize.INTEGER,
	repeat: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	synthname: Sequelize.STRING(80),
	trackingid: Sequelize.INTEGER,
	orderid2: Sequelize.INTEGER,
	excoef: Sequelize.FLOAT,
	gc: Sequelize.FLOAT
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primer');
  }
};
