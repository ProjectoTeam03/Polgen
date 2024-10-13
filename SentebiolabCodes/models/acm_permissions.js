module.exports = (sequelize, DataTypes) => {
  const acm_permissions = sequelize.define('acm_permissions', {
		roleid: DataTypes.INTEGER,
		resource: DataTypes.STRING(50),
		permname: DataTypes.STRING(50)
  },{
		freezeTableName: true,
		timestamps: false
	});

	acm_permissions.removeAttribute('id');
	
  return acm_permissions;
};