module.exports = (sequelize, DataTypes) => {
	const probe_control = sequelize.define('probe_control', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: DataTypes.STRING(90),
		sequence: DataTypes.STRING(250),
		fmod: {
			type: DataTypes.INTEGER,
			references: {
				model: "probe_fifth",
				key: "id"
			}
		},
		tmod: {
			type: DataTypes.INTEGER,
			references: {
				model: "probe_third",
				key: "id"
			}
		},
		purification: {
			type: DataTypes.INTEGER,
			references: {
				model: "primer_puri",
				key: "id"
			}
		},
		scale: {
			type: DataTypes.INTEGER,
			references: {
				model: "primer_sca",
				key: "id"
			}
		}
	}, {
			timestamps: false,
			freezeTableName: true,
	});

	return probe_control;

};