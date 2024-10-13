module.exports = (sequelize, DataTypes) => {
	const primer_puri = sequelize.define('primer_puri', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		val: DataTypes.STRING(25)
	}, {
			timestamps: false,
			freezeTableName: true,
		});
	return primer_puri;
};