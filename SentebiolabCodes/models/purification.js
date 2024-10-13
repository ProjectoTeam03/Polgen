module.exports = (sequelize, DataTypes) => {
	const probe_pair = sequelize.define('purification', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
      autoIncrement: true
		},
		name: DataTypes.STRING(50)
	}, {
			timestamps: false,
			freezeTableName: true,
		});
	return probe_pair;
};
