module.exports = (sequelize, DataTypes) => {
	const tracking = sequelize.define('tracking', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: DataTypes.STRING(90),
		type: DataTypes.STRING(20),
		orderid: DataTypes.INTEGER,
	}, {
			timestamps: false,
			freezeTableName: true,
	});

	return tracking;
};