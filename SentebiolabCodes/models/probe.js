module.exports = (sequelize, DataTypes) => {
  const probe = sequelize.define('probe', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
		name: DataTypes.STRING(90),
		sequence: DataTypes.STRING(250),
		fmod: DataTypes.INTEGER,
		tmod: DataTypes.INTEGER,
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
		synthdate: DataTypes.DATE,
		orderid: DataTypes.INTEGER,
		synthid: DataTypes.INTEGER,
		repeat: DataTypes.INTEGER,
		userid: DataTypes.INTEGER,
		synthname: DataTypes.STRING(80),
		trackingid: DataTypes.INTEGER,
		orderid2: DataTypes.INTEGER, //backup orderid
		excoef: DataTypes.FLOAT,
		gc: DataTypes.FLOAT
	},{
		timestamps: false,
		freezeTableName: true,
	});
  return probe;
};