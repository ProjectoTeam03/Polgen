'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			type: {
				type: Sequelize.STRING(50)
			},
			ordernum: {
				type: Sequelize.STRING(50)
			},
			productsnum: {
				type: Sequelize.INTEGER
			},
			totalbp: {
				type: Sequelize.INTEGER
			},
			totalcost: {
				type: Sequelize.FLOAT
			},
			completed: {
				type: Sequelize.FLOAT
			},
			approval: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			date: {
				type: Sequelize.DATE
			},
			shipmentdate: {
				type: Sequelize.DATE
			},
			userid: {
				type: Sequelize.INTEGER
			},
			orderdone: {
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			bill: Sequelize.STRING(400),
			address: Sequelize.STRING(400),
			info: Sequelize.STRING(200),
			payment: {
			type: Sequelize.FLOAT,//DataTypes.FLOAT,
			defaultValue: 0,
			},
			scale: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			mailsent: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			taxoffice: Sequelize.STRING(100),
			taxnumber: Sequelize.STRING(50),
			project: Sequelize.STRING(50)
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('orders');
	}
};