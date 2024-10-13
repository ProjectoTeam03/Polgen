'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('probe_control', {
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
				model: "probe_fifth",
				key: "id"
			}
		},
		tmod: {
			type: Sequelize.INTEGER,
			references: {
				model: "probe_third",
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
    return queryInterface.dropTable('probe_control');
  }
};
