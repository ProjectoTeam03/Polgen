module.exports.editorder = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
			
		console.log(req.body.params);
			
		if (req.body.params.ordertype == "primer") {
			
			var totalnum = 0;
			var totalseq = 0;
			var totalcost = 0;
			var tempscale = 0;
			
			for(var i in req.body.params.items) {
				
				if(req.body.params.deleted.includes(req.body.params.items[i]["id"])) {
					continue;
				}
				
				totalnum ++;
				totalseq += req.body.params.items[i]["sequence"].length;
				totalcost += req.body.params.items[i]["cost"];
				
				if(tempscale == 0 ) {
					tempscale = req.body.params.items[i]["primer_sca"].id;
				} else {
					if (tempscale != req.body.params.items[i]["primer_sca"].id) {
						tempscale = -1;
					}
				}
				
				var tempf = null;
				var tempt = null;
				
				if (req.body.params.items[i]["primer_fifth"] != null && req.body.params.items[i]["primer_fifth"].id != "") {
					tempf = req.body.params.items[i]["primer_fifth"].id;
				}
				
				if (req.body.params.items[i]["primer_third"] != null && req.body.params.items[i]["primer_third"].id != "") {
					tempt = req.body.params.items[i]["primer_third"].id;
				}
				
				let updateprim = await db.primer.update(
					{
						name: req.body.params.items[i]["name"],
						sequence: req.body.params.items[i]["sequence"],
						fmod : tempf,
						tmod : tempt,
						purification : req.body.params.items[i]["primer_puri"].id,
						scale : req.body.params.items[i]["primer_sca"].id,
						cost: req.body.params.items[i]["cost"]
					},
					{ 
						where: { id: req.body.params.items[i]["id"] }
					}
				);
				
			}
			
			if(tempscale == -1) tempscale = 0;
			
			let savedorder = await db.orders.update(
				{
					productsnum: totalnum,
					totalbp: totalseq,
					totalcost: totalcost, // calculate cost for each primer
					scale: tempscale,
				},
				{ 
					where: { id: req.body.params.orderid }
			});
			
			deleted = await db["primer"].destroy({
				where:{
					id : req.body.params.deleted
				}
			});
			
		} else if(req.body.params.ordertype == "probe") {
			
			var totalnum = 0;
			var totalseq = 0;
			var totalcost = 0;
			
			for(var i in req.body.params.items) {
				
				if(req.body.params.deleted.includes(req.body.params.items[i]["id"])) {
					continue;
				}
				
				totalnum ++;
				totalseq += req.body.params.items[i]["sequence"].length;
				totalcost += req.body.params.items[i]["cost"];
				
				var tempf = null;
				var tempt = null;
				
				if (req.body.params.items[i]["probe_fifth"] != null && req.body.params.items[i]["probe_fifth"].id != "") {
					tempf = req.body.params.items[i]["probe_fifth"].id;
				}
				
				if (req.body.params.items[i]["probe_third"] != null && req.body.params.items[i]["probe_third"].id != "") {
					tempt = req.body.params.items[i]["probe_third"].id;
				}
				
				let savedorder = await db.probe.update(
					{
						name: req.body.params.items[i]["name"],
						sequence: req.body.params.items[i]["sequence"],
						fmod : tempf,
						tmod : tempt,
						cost: req.body.params.items[i]["cost"],
					},
					{ 
						where: { id: req.body.params.items[i]["id"] }
					}
				);
				
			}
			
			let savedorder = await db.orders.update(
				{
					productsnum: totalnum,
					totalbp: totalseq,
					totalcost: totalcost, // calculate cost for each primer
				},
				{ 
					where: { id: req.body.params.orderid }
			});
			
			deleted = await db["probe"].destroy({
				where:{
					id : req.body.params.deleted
				}
			});
			
		}

			
		res.status(200).send({ok :'ok'});
  };
};

