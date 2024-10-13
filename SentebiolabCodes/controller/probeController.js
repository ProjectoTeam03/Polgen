module.exports.probeController = (db) => {
	
	return async function (req, res, next) {
	if (db == null)
		return;
		
		if(req.body.params.probes.length === 0) {
			res.status(200).send({ok :'nok'});
			return;
		}
				
		var paramUserId = req.session.userId;
		
		if(req.body.params.userId != undefined) {
			paramUserId = req.body.params.userId
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
					type: 'probe',
					ordernum: ordernum, // generate this
					productsnum: req.body.params.probes.length,
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
						type: 'probe', // generate this
						productsnum: req.body.params.probes.length,
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
				//may want to check probe validity here
				for(var i in req.body.params.probes) {
					req.body.params.probes[i]["orderitem"] = true;
					req.body.params.probes[i]["userid"] = paramUserId;
				}
				let temp = await db.probe_temporary.bulkCreate(
					req.body.params.probes, { validate: true }
				);
		
			} catch(err) {
				console.log(err);
				res.status(200).send({ok :'nok'});
				return;
			}
			
			res.status(200).send({ok :'ok'});
			return;
		});	
	
	};
};