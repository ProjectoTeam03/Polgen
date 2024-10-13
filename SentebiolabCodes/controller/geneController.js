module.exports.geneController = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		
		if(req.body.params.genes.length == 0) {
			res.status(200).send({ok :'nok'});
			return;
		}
				
		var paramUserId = req.session.userId;
		
		if(req.body.params.userId != undefined) {
			paramUserId = req.body.params.userId
		}
		
		var exists;
		try {
			exists = await db["orders"].findAll({
				attributes: ["id"],
				limit: 1,
				where:{
					orderdone: false,
					userid: paramUserId
				}
			});
		} catch(err) {
			console.log(err);
		}
		var tlength = 0;
		var tcost = 0;
		for(var i in req.body.params.genes) {
			tlength += req.body.params.genes[i]["sequence"].length;
			tcost += Number(req.body.params.genes[i]["cost"]);
		}
		tcost = Number.parseFloat(tcost).toFixed(2);
		
		var orderid = 0;
		if (exists.length == 0) {
			
			var c = await db.orders.count({
				where: {
					orderdone: true,
					userid: paramUserId,
				}
			});
			
			var ordernum = "ERR";
					
			var userInfo = await db.users.findOne({
				attributes: ["company","name","ordernum"],
				where : {
					userid: paramUserId,
				}
			})
			ordernum = userInfo.dataValues.company + " - " + userInfo.dataValues.name + "-" + userInfo.dataValues.ordernum.toStrLen(4)
		
			
			let order = db.orders.build({
				id: db.sequelize.literal('DEFAULT'),
				type: 'gene',
				ordernum: ordernum, // generate this
				productsnum: req.body.params.genes.length,
				totalbp: tlength,
				totalcost: tcost, // calculate cost for each probe
				completed: 0,
				approval: false,
				date: db.sequelize.literal('NOW()'),
				userid: paramUserId,
				orderdone: false
			});
			let savedorder = await order.save();
			orderid = savedorder["dataValues"].id;
			
		} else {
			let savedorder = await db.orders.update(
				{
					type: 'gene', // generate this
					productsnum: req.body.params.genes.length,
					totalbp: tlength,
					totalcost: tcost, // calculate cost for each probe
					date: db.sequelize.literal('NOW()'),
				},
				{ 
					where: { id: exists[0].dataValues.id }
				}
			);
			orderid = exists[0].dataValues.id;
		}
		if(orderid == 0) {
			//order sıctı return nok
		}
		
		try {
			existing = await db["gene_temporary"].destroy({
				where:{
					orderitem: true,
					userid: paramUserId
				}
			});
			
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		
		try {
			//may want to check probe validity here
			for(var i in req.body.params.genes) {
				req.body.params.genes[i]["cost"] = 0; // TO DO calculate gene value
				req.body.params.genes[i]["orderitem"] = true;
				req.body.params.genes[i]["userid"] = paramUserId;
			}
			let temp = await db.gene_temporary.bulkCreate(
				req.body.params.genes, { validate: true }
			);
	
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		
		res.status(200).send({ok :'ok'});
		return;
		

	};
};