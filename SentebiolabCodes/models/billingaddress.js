module.exports = (sequelize, DataTypes) => {
	const billingaddress = sequelize.define('billingaddress', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		taxoffice: DataTypes.STRING(50),
		taxnumber: DataTypes.STRING(50),
		address: DataTypes.STRING(500),
		project: DataTypes.STRING(50),
		natid: DataTypes.STRING(50),
		phone: DataTypes.STRING(50),
		mail: DataTypes.STRING(100),
		userid: {
			type: DataTypes.INTEGER,
			references: {
				model: "acm_users",
				key: "id"
			}
		}
	}, {
			freezeTableName: true,
			timestamps: false
		});
	return billingaddress;
};
