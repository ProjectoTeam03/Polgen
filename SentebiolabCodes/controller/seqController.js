module.exports.seqController = (db) => {
	
	return async function (req, res, next) {
		let i;
		if (db == null) return;
		
		if(req.body.params.seqs.length === 0) {
			res.status(200).send({ok :'nok'});
			return;
		}

		let paramUserId = req.session.userId;

		if(req.body.params.userId !== undefined) {
			paramUserId = req.body.params.userId
		}
		
		let seqs = req.body.params.seqs;
			
		
		for(i in seqs) {
			seqs[i]["id"] = db.sequelize.literal('DEFAULT');
			seqs[i]["ordered"] = false;
			seqs[i]["userid"] = paramUserId;
			if (seqs[i]["size"] === "")
				seqs[i]["size"] = 0;
			if (seqs[i]["pcons"] === "")
				seqs[i]["pcons"] = 0;
			
			if (seqs[i]["seqtype"] === 1) {
				seqs[i]["type"] = "Sanger - PCR";
				if (seqs[i]["puri"])
					seqs[i]["cost"] = 7.99;
				else
					seqs[i]["cost"] = 6.99;
			}
			else if	(seqs[i]["seqtype"] === 2){
				seqs[i]["type"] = "Sanger - Plazmit";
				seqs[i]["cost"] = 6.99;
				seqs[i]["puri"] = null;
			}
			else if	(seqs[i]["seqtype"] === 3){
				seqs[i]["type"] = "NextGen";
				seqs[i]["cost"] = 19.99;
				seqs[i]["puri"] = null;
			}
			else if	(seqs[i]["seqtype"] === 4){
				seqs[i]["type"] = "NextGen - Denovo";
				seqs[i]["cost"] = 250;
				seqs[i]["puri"] = null;
			}
		}

		let exists;
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
				
		let tlength = 0;
		let tcost = 0;
		for(i in seqs) {
			tcost += Number(seqs[i]["cost"]);
		}
		tcost = Number.parseFloat(tcost).toFixed(2);
		
		var orderid = 0;
		if (exists.length === 0) {
			
			await db.orders.count({
				where: {
					orderdone: true,
					userid: paramUserId,
				}
			});

			let ordernum = "ERR";
			const userInfo = await db.users.findOne({
				attributes: ["company", "name", "ordernum"],
				where: {
					userid: paramUserId,
				}
			});
			ordernum = userInfo.dataValues.company + " - " + userInfo.dataValues.name + "-" + userInfo.dataValues.ordernum.toStrLen(4)
			let order = db.orders.build({
				id: db.sequelize.literal('DEFAULT'),
				type: 'sequence',
				ordernum: ordernum, // generate this
				productsnum: seqs.length,
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
			await db.orders.update(
				{
					type: 'sequence', // generate this
					productsnum: seqs.length,
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
		if(orderid === 0) {
			//order sıctı return nok
		}
		
		try {
			existing = await db["sequence"].destroy({
				where:{
					ordered: false,
					userid: paramUserId
				}
			});
			
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		
		try {
			for(i in seqs) {
				seqs[i]["orderid"] = orderid;
			}
			let temp = await db.sequence.bulkCreate(
				seqs, { validate: true }
			);
	
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'insertnok'});
			return;
		}
		
		res.status(200).send({ok :'ok'});
	};
};