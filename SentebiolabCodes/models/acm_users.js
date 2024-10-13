module.exports = (sequelize, DataTypes) => {
	return sequelize.define('acm_users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		role: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		pwd: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		userid: DataTypes.INTEGER
	},
	{
		freezeTableName: true,
		timestamps: false
	});
};
