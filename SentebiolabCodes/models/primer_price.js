module.exports = (sequelize, DataTypes) => {
	const primer_price = sequelize.define('primer_price', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		puriid: DataTypes.INTEGER,
		scaid: DataTypes.INTEGER,
		val: DataTypes.DOUBLE,
		couponid:  DataTypes.INTEGER
	}, {
			timestamps: false,
			freezeTableName: true,
		});
	return primer_price;
};