module.exports = (sequelize, DataTypes) => {
	return sequelize.define('acm_roles', {
	  id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true
	  },
	  name: DataTypes.STRING(50),
	  mainpage: DataTypes.STRING(50)
  }, {
	  freezeTableName: true,
	  timestamps: false
  });
};