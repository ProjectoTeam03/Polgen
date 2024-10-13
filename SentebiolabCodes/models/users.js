module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
    },
		name: DataTypes.STRING(50),
		mail: DataTypes.STRING(100),
		company: DataTypes.STRING(100),
		department: DataTypes.STRING(100),
		door: DataTypes.STRING(50),
		address: DataTypes.STRING(500),
		phone: DataTypes.STRING(50),
		userid: DataTypes.INTEGER,
		ordernum: DataTypes.INTEGER,
  },{
		freezeTableName: true,
		timestamps: false
	});

  return users;
};