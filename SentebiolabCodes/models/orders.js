'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
    },
		type: DataTypes.STRING(50),
		ordernum: DataTypes.STRING(200),
		productsnum: DataTypes.INTEGER,
		totalbp: DataTypes.INTEGER,
		totalcost: DataTypes.FLOAT,
		completed: DataTypes.FLOAT,
		approval: DataTypes.BOOLEAN,
		date: DataTypes.DATE,
		shipmentdate: DataTypes.DATE,
		userid: DataTypes.INTEGER,
		orderdone: DataTypes.BOOLEAN,
		bill: DataTypes.STRING(400),
		address: DataTypes.STRING(400),
		info: DataTypes.STRING(200),
		payment: DataTypes.FLOAT,
		scale: DataTypes.INTEGER,
		mailsent: DataTypes.BOOLEAN,
		taxoffice: DataTypes.STRING(100),
		taxnumber: DataTypes.STRING(50),
		project: DataTypes.STRING(50)
  }, {
		freezeTableName: true,
		timestamps: true
	});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};