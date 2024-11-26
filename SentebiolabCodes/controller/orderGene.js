module.exports.orderGene = (sdb,gdb) => {
	
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
		
		var paramDate = db.sequelize.literal('NOW()');
		
		if(req.body.params.date != undefined) {
			paramDate = req.body.params.date;
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
			res.status(200).send({ok :'nok'});
			return;
		} else {
			let savedorder = await db.orders.update(
				{
					type: 'gene',
					productsnum: req.body.params.genes.length,
					totalbp: tlength,
					totalcost: tcost, // calculate cost for each probe
					date: paramDate,
					orderdone: true,
					info: req.body.params.info,
					address: req.body.params.address,
					bill: req.body.params.bill,
					taxoffice: req.body.params.taxoffice,
					taxnumber: req.body.params.taxnumber,
					project: req.body.params.project
				},
				{ 
					where: { id: exists[0].dataValues.id }
				}
			);
			orderid = exists[0].dataValues.id;
		}
		if(orderid == 0) {
			res.status(200).send({ok :'nok'});
			return;
		} else {
				
			var userInfo = await db.users.findOne({
				attributes: ["ordernum"],
				where : {
					userid: paramUserId,
				}
			})
			
			let increment = await db.users.update(
				{
					ordernum: (userInfo.dataValues.ordernum + 1)
				},
				{ 
					where: { userid:paramUserId }
				}
			);
			
		}
		
		try {

            //WARN:-----------------------undeclared or not found---------------------------
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
			for(var i in req.body.params.genes) {
				req.body.params.genes[i]["id"] = db.sequelize.literal('DEFAULT');
				req.body.params.genes[i]["orderid"] = orderid;
				req.body.params.genes[i]["userid"] = paramUserId;
			}
			let temp = await db.gene.bulkCreate(
				req.body.params.genes, { validate: true }
			);
	
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		
		res.status(200).send({ok :'ok', ordernum: orderid});
		return;
		
	};
};

/*
		let psPromises = [];
		req.body.params.probes.forEach(function(t){
			psPromises.push(new Promise(function(resolveMult){
								
				db["probe_pair"].findAll({
					attributes: ["val"],
					limit: 1,
					where: {
						fmodid: t["fmod"],
						tmodid: t["tmod"]
					}
				})
				.then(p => {
					resolveMult({probe : t, val: p[0].dataValues["val"]});
				})
				.catch(error => {
					console.log(error);
				});
			}));
		});
	
		Promise.all(psPromises).then(async values => {
			let l = values.length;
						
			for(var i=0;i<l;i++) {					
				if 	(values[i].val == null) values[i].probe["cost"] = 0;			
				else values[i].probe["cost"] = Number.parseFloat(values[i].val).toFixed(2);
			}

			
		});	*/
