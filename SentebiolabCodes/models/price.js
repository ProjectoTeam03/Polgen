module.exports = (sequelize, DataTypes) => {
  const price = sequelize.define('price', {
		scale: DataTypes.STRING(50),
		desalting: DataTypes.FLOAT,
		opc: DataTypes.FLOAT,
		hplc: DataTypes.FLOAT
  },{
		timestamps: false,
		freezeTableName: true,
	});
	price.removeAttribute('id');
  return price;
};