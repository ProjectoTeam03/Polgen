module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define('schedule', {
		mon: DataTypes.STRING(50),
		tue: DataTypes.STRING(50),
		wed: DataTypes.STRING(50),
		thu: DataTypes.STRING(50),
		fri: DataTypes.STRING(50),
  },{
		freezeTableName: true,
		timestamps: false
	});

  return schedule;
};