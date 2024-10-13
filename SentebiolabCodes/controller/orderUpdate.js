module.exports.orderUpdate = (sdb) => {
	return async function (req, res, next) {
		if (sdb == null)
			return;
		const v = req.body.params;
		for(let i in v.orderids) {
			let counts = await sdb.sequelize.query("select count(synthid) filter (where synthid != 0) as synthed, " +
				"count(*) as total from " + req.body.params.type + " where orderid = " + v.orderids[i] + ";",
				{ type: sdb.sequelize.QueryTypes.RAW});
			await sdb.sequelize.query("UPDATE orders SET completed = " +
				parseInt(counts[0][0].synthed)/parseInt(counts[0][0].total) +
				" where id = " + v.orderids[i] + ";", { type: sdb.sequelize.QueryTypes.RAW});
		}
		
		res.status(200).send({ok :'ok'});
	};
};