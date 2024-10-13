module.exports = (sequelize, DataTypes) => {
	const primer = sequelize.define('primer', {
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
		inozine: DataTypes.STRING(80),
		synthno: DataTypes.STRING(100), // They're using this as date as well
		dmt: DataTypes.BOOLEAN,
		a260: DataTypes.FLOAT,
		tmbasic: DataTypes.STRING(25),
		mw: DataTypes.FLOAT,
		conc: DataTypes.FLOAT,
		totalng: DataTypes.FLOAT,
		od: DataTypes.FLOAT,
		totalnmol: DataTypes.FLOAT,
		orderid: DataTypes.INTEGER,
		userid: DataTypes.INTEGER,
		synthid: DataTypes.INTEGER,
		repeat: DataTypes.INTEGER,
		synthname: DataTypes.STRING(80),
		trackingid: DataTypes.INTEGER,
		orderid2: DataTypes.INTEGER,
		excoef: DataTypes.FLOAT,
		gc: DataTypes.FLOAT
	}, {
			timestamps: false,
			freezeTableName: true,
	});

	return primer;

};