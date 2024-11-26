module.exports.extraservice = (db) => {
	
	return async function (req, res, next) {
		if (db == null)
			return;
		
		let servname = Object.keys(req.body.services)[0];
		let resp2 = {
			type: req.body.type,
			ok: true,
			services: {}
		};
		
		var userid = req.user.id
		if (req.body.services[servname].filter && req.body.services[servname].filter.where && req.body.services[servname].filter.where.userid)
			userid = req.body.services[servname].filter.where.userid;
		const extra = req.body.services[servname].extra;

		if(extra === "puricount") {
			
			console.log(req.body)
			
			var exists;
			
			if (req.body.services[servname].confirm) {
				try {
					exists = await db["orders"].findAll({
						attributes: ["type","productsnum", "totalbp"],
						limit: 1,
						where:{
							userid: userid,
							orderdone: false
						}
					});
				} catch(err) {
					console.log(err);
				}
			} else {
				try {
					exists = await db["orders"].findAll({
						attributes: ["type","productsnum", "totalbp"],
						limit: 1,
						where:{
							id: req.body.services[servname].filter.where.orderid
						}
					});
				} catch(err) {
					console.log(err);
				}
			}
			
			if (exists[0].dataValues.type == "primer") {

				if (req.body.services[servname].confirm) {
					try {
            //WARN:-----------------------undeclared or not found---------------------------
            
						cntq = await db["primer_temporary"].findAll({
							attributes: ["purification", [db.sequelize.fn("COUNT", db.sequelize.col("primer_temporary.purification")), "puricount" ]],
							where:{
								userid : userid,
								orderitem: true
							},
							group: ["primer_temporary.purification"]
						});
						
						var data = {};
						cntq.forEach(function(cnt){
							var key = cnt.dataValues.purification;
							data[key] = cnt.dataValues.puricount;
						})
						
						data["productsnum"] = exists[0].dataValues["productsnum"];
						data["totalbp"] = exists[0].dataValues["totalbp"];
						
						resp2.services[servname] = [];
						resp2.services[servname].push(data);
						res.status(200).send(resp2);
						
					} catch(err) {
						console.log(err);
					} 
				} else {
					try {
						cntq = await db["primer"].findAll({
							attributes: ["purification", [db.sequelize.fn("COUNT", db.sequelize.col("primer.purification")), "puricount" ]],
							where:{
								orderid : req.body.services[servname].filter.where.orderid
							},
							group: ["primer.purification"]
						});
						
						var data = {};
						cntq.forEach(function(cnt){
							var key = cnt.dataValues.purification;
							data[key] = cnt.dataValues.puricount;
						})
						
						data["productsnum"] = exists[0].dataValues["productsnum"];
						data["totalbp"] = exists[0].dataValues["totalbp"];
						
						resp2.services[servname] = [];
						resp2.services[servname].push(data);
						res.status(200).send(resp2);
						
					} catch(err) {
						console.log(err);
					} 
				}
			} else if (exists[0].dataValues.type == "probe") {
				
				var data = {};
				data["productsnum"] = exists[0].dataValues["productsnum"];
				data["totalbp"] = exists[0].dataValues["totalbp"];
				data["3"] = exists[0].dataValues["productsnum"];
				
				resp2.services[servname] = [];
				resp2.services[servname].push(data);
				res.status(200).send(resp2);
			} else if (exists[0].dataValues.type == "sequence") {
				
				var data = {};
				data["productsnum"] = exists[0].dataValues["productsnum"];
				
				resp2.services[servname] = [];
				resp2.services[servname].push(data);
				res.status(200).send(resp2);
			} else if (exists[0].dataValues.type == "gene") {
				
				var data = {};
				data["productsnum"] = exists[0].dataValues["productsnum"];
				data["totalbp"] = exists[0].dataValues["totalbp"];
				
				resp2.services[servname] = [];
				resp2.services[servname].push(data);
				res.status(200).send(resp2);
			}
		}
	};
}
