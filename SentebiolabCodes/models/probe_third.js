module.exports = (sequelize, DataTypes) => {
	const probe_third = sequelize.define('probe_third', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		val: DataTypes.STRING(25),
		name: DataTypes.STRING(50),
		category: DataTypes.STRING(50),
		e260: DataTypes.INTEGER,
		mw: DataTypes.DOUBLE
	}, {
			timestamps: false,
			freezeTableName: true,
		});
	return probe_third;
};