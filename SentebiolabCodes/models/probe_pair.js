module.exports = (sequelize, DataTypes) => {
	const probe_pair = sequelize.define('probe_pair', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		fmodid: DataTypes.INTEGER,
		tmodid: DataTypes.INTEGER,
		val: DataTypes.DOUBLE
	}, {
			timestamps: false,
			freezeTableName: true,
		});
	return probe_pair;
};