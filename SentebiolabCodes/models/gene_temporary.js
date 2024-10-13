module.exports = (sequelize, DataTypes) => {
	const gene_temporary = sequelize.define('gene_temporary', {
		name: DataTypes.STRING(50),
		sequence: DataTypes.STRING(3000),
		cost: DataTypes.FLOAT,
		userid: DataTypes.INTEGER,
		orderitem: DataTypes.BOOLEAN
	},{
		timestamps: false,
		freezeTableName: true,
	});
	gene_temporary.removeAttribute('id');
	return gene_temporary;
};