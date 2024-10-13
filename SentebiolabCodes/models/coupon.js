module.exports = (sequelize, DataTypes) => {
  const coupon = sequelize.define('coupon', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
		name: DataTypes.STRING(100)
	},{
		timestamps: false,
		freezeTableName: true,
	});
  return coupon;
};