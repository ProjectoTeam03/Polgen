module.exports.deleteOrder = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
				
		try {
			var del = await db[req.body.params.type].destroy({
				where:{
					orderid: req.body.params.orderid
				}
			});
			
			var delorder = await db["orders"].destroy({
				where:{
					id: req.body.params.orderid
				}
			});
			
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		
		/*
		if(req.body.params.type == "primer") {
			
		} else if(req.body.params.type == "probe") {
			
		} else if(req.body.params.type == "sequence") {
			
		} */
		
		res.status(200).send({ok :'ok'});
		return;
		
	};
};