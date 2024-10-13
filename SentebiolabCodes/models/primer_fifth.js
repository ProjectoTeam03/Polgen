module.exports = (sequelize, DataTypes) => {
  const primer_fifth = sequelize.define('primer_fifth', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
		val: DataTypes.STRING(25),
		name: DataTypes.STRING(50),
		category: DataTypes.STRING(50),
		e260: DataTypes.INTEGER,
		mw: DataTypes.DOUBLE,
		costval: DataTypes.DOUBLE
	},{
		timestamps: false,
		freezeTableName: true,
	});
  return primer_fifth;
};