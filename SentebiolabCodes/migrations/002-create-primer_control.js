'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('primer_control', {
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
		}
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('primer_control');
  }
};
