module.exports.orderSeq = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		
		if(req.body.params.seqs.length == 0) {
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
		
		var seqs = req.body.params.seqs;
		
		let idarr = [];
		for (i in seqs) {
			idarr.push(seqs[i]["id"]);
		}
		
		var dbseqs;
		
		try {
			dbseqs = await db["sequence"].findAll({
				attributes: ["id","cost","orderid"],
				where:{
					id: idarr,
					ordered: false,
					userid: paramUserId
				}
			});
		} catch(err) {
			console.log(err);
		}
		
		if(dbseqs == null || dbseqs.length == 0) {
			res.status(200).send({ok :'nok'});
			return;
		} else {
			var tlength = 0;
			var tcost = 0;
			for(var i in dbseqs) {
				tcost += Number(dbseqs[i]["dataValues"]["cost"]);
			}
			tcost = Number.parseFloat(tcost).toFixed(2);
			let orderid = dbseqs[0]["dataValues"]["orderid"];
			
			let savedorder = await db.orders.update(
				{
					type: 'sequence',
					productsnum: dbseqs.length,
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
					where: { 
						id: orderid,
						orderdone: false,
					}
				}
			);
			
			let saveseqs = await db.sequence.update(
				{
					ordered: true
				},
				{ 
					where:{
						id: idarr,
						ordered: false,
						userid: paramUserId
					}
				}
			);
			
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
				
			res.status(200).send({ok :'ok', ordernum: orderid});
			return;
		}
		
		
		
	};
};