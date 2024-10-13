module.exports = (sequelize, DataTypes) => {
	const primer_temporary = sequelize.define('primer_temporary', {
		name: DataTypes.STRING(50),
		sequence: DataTypes.STRING(250),
		fmod: {
			type: DataTypes.INTEGER,
			references: {
				model: "primer_fifth",
				key: "id"
			}
		},
		tmod: {
			type: DataTypes.INTEGER,
			references: {
				model: "primer_third",
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
		},
		cost: DataTypes.FLOAT,
		userid: DataTypes.INTEGER,
		orderitem: DataTypes.BOOLEAN
	}, {
			timestamps: false,
			freezeTableName: true,
	});
	primer_temporary.removeAttribute('id');
	return primer_temporary;

};