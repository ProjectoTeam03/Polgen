module.exports.orderProbe = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		
		if(req.body.params.probes.length == 0) {
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
			for(var i in req.body.params.probes) {
				tlength += req.body.params.probes[i]["sequence"].length;
				tcost += Number(req.body.params.probes[i]["cost"]);
			}
			tcost = Number.parseFloat(tcost).toFixed(2);
			
			var orderid = 0;
			if (exists.length == 0) {
				res.status(200).send({ok :'nok'});
				return;
			} else {
				let savedorder = await db.orders.update(
					{
						type: 'probe',
						productsnum: req.body.params.probes.length,
						totalbp: tlength,
						totalcost: tcost, // calculate cost for each probe
						date: paramDate,
						orderdone: true,
						info: req.body.params.info,
						address: req.body.params.address,
						scale: 3,
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
				existing = await db["probe_temporary"].destroy({
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
				for(var i in req.body.params.probes) {
					req.body.params.probes[i]["id"] = db.sequelize.literal('DEFAULT');
					req.body.params.probes[i]["orderid"] = orderid;
					req.body.params.probes[i]["userid"] = paramUserId;
					req.body.params.probes[i]["orderid2"] = orderid;
				}
				let temp = await db.probe.bulkCreate(
					req.body.params.probes, { validate: true }
				);
		
			} catch(err) {
				console.log(err);
				res.status(200).send({ok :'nok'});
				return;
			}
			
			res.status(200).send({ok :'ok', ordernum: orderid});
			return;
		});	
	};
};