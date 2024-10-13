module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define('synth', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: DataTypes.STRING(100),
		date: DataTypes.DATE,
		type: DataTypes.STRING(20),
		
		///////
		
		scale: DataTypes.STRING(10),
		pcount: DataTypes.FLOAT,
		bp: DataTypes.INTEGER,
		
		dsltn: DataTypes.INTEGER,
		dsltaod: DataTypes.FLOAT,
		dsltanmol: DataTypes.FLOAT,
		
		opcn: DataTypes.INTEGER,
		opcaod: DataTypes.FLOAT,
		opcanmol: DataTypes.FLOAT,
		
		hplcn: DataTypes.INTEGER,
		hplcaod: DataTypes.FLOAT,
		hplcanmol: DataTypes.FLOAT,
		
		minod: DataTypes.FLOAT,
		maxod: DataTypes.FLOAT,
		minnmol: DataTypes.FLOAT,
		maxnmol: DataTypes.FLOAT,
		
		fill: DataTypes.FLOAT,
		repeat: DataTypes.INTEGER
		
  },{
		freezeTableName: true,
		timestamps: false
	});

  return schedule;
};