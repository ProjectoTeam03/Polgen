module.exports = (sequelize, DataTypes) => {
  const primer_sca = sequelize.define('primer_sca', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
		val: DataTypes.STRING(25)
	},{
		timestamps: false,
		freezeTableName: true,
	});
  return primer_sca;
};