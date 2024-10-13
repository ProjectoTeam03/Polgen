module.exports.synthadd = (db) => {
	
	return async function (req, res, next) {

	if (db == null)
		return;
		
	let orders = await db.sequelize.query("select orderid as orderid from " + req.body.params.type +
		" where synthid = " + req.body.params.synthid + " group by orderid;", { type: db.sequelize.QueryTypes.RAW});

	orders[0].forEach(async function(v){
		let counts = await db.sequelize.query("select count(synthid) filter (where synthid != 0) as synthed, " +
			"count(*) as total from " + req.body.params.type + " where orderid = " + v.orderid + ";",
			{ type: db.sequelize.QueryTypes.RAW});
				await db.sequelize.query("UPDATE orders SET completed = " +
					parseInt(counts[0][0].synthed)/parseInt(counts[0][0].total) + " where id = " + v.orderid + ";",
					{ type: db.sequelize.QueryTypes.RAW});
			});
			
			res.json({ok:true});
			
		};
};