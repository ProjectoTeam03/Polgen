module.exports.pricetable = (db) => {
	
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
		if (req.body.services[servname].filter && req.body.services[servname].filter.where && req.body.services[servname].filter.where.userid) userid = req.body.services[servname].filter.where.userid;
		
		if (!req.body.services[servname].primer) {
		
			let q1 = await db.sequelize.query("select array_agg( pr.scaid || '_' || pr.puriid || ':' || pr.val ) as resp from primer_price pr left outer join users us on us.couponid = pr.couponid where us.userid = " + userid + " group by scaid order by scaid;", { type: db.sequelize.QueryTypes.SELECT});
			let q2 = await db.sequelize.query("select array_agg( pr.scaid || '_' || pr.puriid || ':' || pr.val ) as resp from primer_price pr  where pr.couponid = 1 group by scaid order by scaid;", { type: db.sequelize.QueryTypes.SELECT});
			
			let resp = [{scale:"50nmol"},{scale:"100nmol"},{scale:"200nmol"}];
			
			q2.forEach(function(v, i) {
				let splitted = v.resp[0].split(":");
				resp[i][splitted[0]] = splitted[1];
				splitted = v.resp[1].split(":");
				resp[i][splitted[0]] = splitted[1];
				splitted = v.resp[2].split(":");
				resp[i][splitted[0]] = splitted[1];
			});
			
			q1.forEach(function(v) {
				v.resp.forEach(function(vv){
					let splitted = vv.split(":");
					for(var i=0;i<3;i++) {
						if(resp[i][splitted[0]]) {
							resp[i][splitted[0]] = splitted[1];
							break;
						}
					}
				});
			});
			
			for(var i=0;i<3;i++) {
				Object.keys(resp[i]).forEach(function(v) {
					if(v.split("_")[1] == "1") {
						resp[i].c1 = resp[i][v];
						delete resp[i][v];
					} else if(v.split("_")[1] == "2") {
						resp[i].c2 = resp[i][v];
						delete resp[i][v];
					} else if(v.split("_")[1] == "3") {
						resp[i].c3 = resp[i][v];
						delete resp[i][v];
					} 
				});
			}
			resp2.services[servname] = resp;
			res.status(200).send(resp2);
		} else {
			
			let q1 = await db.sequelize.query("select array_agg( pr.scaid || '_' || pr.puriid || ':' || pr.val ) as resp from primer_price pr left outer join users us on us.couponid = pr.couponid where us.userid = " + userid + " group by scaid order by scaid;", { type: db.sequelize.QueryTypes.SELECT});
			let q2 = await db.sequelize.query("select array_agg( pr.scaid || '_' || pr.puriid || ':' || pr.val ) as resp from primer_price pr  where pr.couponid = 1 group by scaid order by scaid;", { type: db.sequelize.QueryTypes.SELECT});
			
			var tempresp = [], resp = [{},{},{}];
			
			q2.forEach(function(v, i) {
				let splitted = v.resp[0].split(":");
				resp[i][splitted[0]] = splitted[1];
				splitted = v.resp[1].split(":");
				resp[i][splitted[0]] = splitted[1];
				splitted = v.resp[2].split(":");
				resp[i][splitted[0]] = splitted[1];
			});
			
			q1.forEach(function(v) {
				v.resp.forEach(function(vv){
					let splitted = vv.split(":");
					for(var i=0;i<3;i++) {
						if(resp[i][splitted[0]]) {
							resp[i][splitted[0]] = splitted[1];
							break;
						}
					}
				});
			});
			
			resp.forEach(function(v, i) {
				Object.keys(v).forEach(function(k){
					var tempobj = {};
					tempobj.val = v[k];
					tempobj.scaid = k.split("_")[0];
					tempobj.puriid = k.split("_")[1];
					tempresp.push(tempobj);
				});
			});
			resp2.services[servname] = tempresp;
			res.status(200).send(resp2);
		}
  };
};