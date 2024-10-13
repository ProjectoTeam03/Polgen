module.exports.gene = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		
		console.log("//////////////////")
		console.log(req.body.params);

		if(req.body.params.action == "complete") {
	
			let counts = await db.sequelize.query("select count(completed) filter (where completed != FALSE) as synthed, count(*) as total from " + "gene" + " where orderid = " + req.body.params.orderid + ";", { type: db.sequelize.QueryTypes.RAW});
			console.log("//////////////////")
			console.log(counts);
			await db.sequelize.query("UPDATE orders SET completed = " + parseInt(counts[0][0].synthed)/parseInt(counts[0][0].total) + " where id = " + req.body.params.orderid + ";", { type: db.sequelize.QueryTypes.RAW});
			
			res.status(200).send({ok :'ok'});
		
		} else if(req.body.params.action == "temp") {

			res.status(200).send({ok :'nok'});
			
		}
	};
};