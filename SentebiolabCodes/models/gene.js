module.exports = (sequelize, DataTypes) => {
  const probe = sequelize.define('gene', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
		name: DataTypes.STRING(90),
		sequence: DataTypes.STRING(3000),
		cost: DataTypes.FLOAT,
		orderid: DataTypes.INTEGER,
		userid: DataTypes.INTEGER,
		trackingid: DataTypes.INTEGER,
		completed: DataTypes.BOOLEAN
	},{
		timestamps: false,
		freezeTableName: true,
	});
  return probe;
};