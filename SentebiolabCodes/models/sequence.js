module.exports = (sequelize, DataTypes) => {
  const sequence = sequelize.define('sequence', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
		name: DataTypes.STRING(80),
		type: DataTypes.STRING(30),
		cons: DataTypes.FLOAT,
		size: DataTypes.INTEGER,
		pname: DataTypes.STRING(80),
		pcons: DataTypes.FLOAT,
		puri: DataTypes.BOOLEAN,
		cost: DataTypes.FLOAT,
		orderid: DataTypes.INTEGER,
		ordered: DataTypes.BOOLEAN,
		userid: DataTypes.INTEGER,
		fasta: DataTypes.STRING(50000),
		trackingid: DataTypes.INTEGER,
	},{
		timestamps: false,
		freezeTableName: true,
	});
  return sequence;
};