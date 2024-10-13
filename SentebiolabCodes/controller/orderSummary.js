module.exports.orderSummary = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		let response = {
			type: req.body.type,
			ok: true,
			services: {}
		};
		let promises = [];
		Object.keys(req.body.services).forEach(function(k) {
			var svc = req.body.services[k];
			promises.push(new Promise(function(resolve, reject) {
					db.sequelize.query("select sum(char_length(pr.sequence)) as bp, pu.name, count(*) as cnt from primer pr inner join purification pu on pr.purification = pu.id where pr.orderid="
						+ svc.filter.where.orderid + " group by pu.name;", { type: db.sequelize.QueryTypes.SELECT})
					/*db.primer.findAll({
						attributes: [[db.sequelize.fn("sum", [db.sequelize.fn("char_length", db.sequelize.col("sequence")), "bt_length"]), "bp"], "purification", db.sequelize.fn("count", db.sequelize.col("id"))],
						group: ["purification"],
						where: {
							orderid: svc.params.orderid
						}
					})*/
					.then(p => {
						var anObj = {}, anotherObj = {};
						anotherObj.totalbp = 0;
						anotherObj.totalcnt = 0;
						p.forEach(function(v) {
							anotherObj[v.name] = v.cnt;
							anotherObj.totalbp += parseInt(v.bp);
							anotherObj.totalcnt += parseInt(v.cnt);
						});
						anObj[k] = anotherObj;
						resolve(anObj);
					})
					.catch(error => {
						let anObj = {};
						anObj[k] = error;
						resolve(anObj);
					});
			}));
		});
		Promise.all(promises).then(function(values) {
			var l = values.length;
			for(var i=0;i<l;i++) {
				var k = Object.keys(values[i])[0];
				response.services[k] = values[i][k];
			}
			res.json(response);
		});
	};
};