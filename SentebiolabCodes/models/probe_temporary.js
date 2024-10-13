module.exports = (sequelize, DataTypes) => {
	const probe_temporary = sequelize.define('probe_temporary', {
		name: DataTypes.STRING(50),
		sequence: DataTypes.STRING(250),
		fmod: DataTypes.INTEGER, 
		tmod: DataTypes.INTEGER,
		cost: DataTypes.FLOAT,
		userid: DataTypes.INTEGER,
		orderitem: DataTypes.BOOLEAN
	},{
		timestamps: false,
		freezeTableName: true,
	});
	probe_temporary.removeAttribute('id');
	return probe_temporary;
};