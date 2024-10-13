module.exports.tableRead = (db) => {
	
	return async function (req, res, next) {
		if (db == null)
			return;
		let response = {
			type: req.body.type,
			ok: true,
			services: {}
		};
		let promises = [];
		Object.keys(req.body.services).forEach(function(k) {
			const svc = req.body.services[k];
			promises.push(new Promise(function(resolve, reject) {
				if(svc.table) {
					let attr = svc.filter ? svc.filter : {};
					attr.attributes = svc.columns;
					if (attr.where) {
						Object.keys(attr.where).forEach(function (wherekey) {
							if (typeof attr.where[wherekey] == "object" && attr.where[wherekey]) {
								const whereobj = attr.where[wherekey];
								const op = function (wop) {
									if (wop === "not") return db.sequelize.Op.ne;
									else if (wop === "eq") return db.sequelize.Op.eq;
									else return wop;
								}(whereobj.op);
								if(!attr.where["$" + wherekey + "$"]) attr.where["$" + wherekey + "$"] = {};
								attr.where["$" + wherekey + "$"][op] = whereobj.val;
								delete attr.where[wherekey];
							}
						});
					}
					if (svc.order) {
						attr.order = [];
						svc.order.forEach(function (ord) {
							attr.order.push(db.sequelize.literal(ord));
						});
						//attr.order = [db.sequelize.literal('orders.type ASC'), db.sequelize.literal('orders.id DESC')]
					}
					if (svc.raw) {
						attr.raw = true;
					}

					//attr.nest = false; ??? 
					if(req.user.role !== "admin" && req.user.role !== "production" && req.user.role !== "seqproduction") {

						if(!attr.where) attr.where = {userid:req.user.id};
						else attr.where = Object.assign({}, attr.where, {userid:req.user.id});
					}
					if (svc.join) svc.join.forEach(function (j) {
						db[svc.table].belongsTo(db[j.table], {/*as: j.alias,*/ foreignKey: j.foreign, targetKey: j.target });
						if (!attr.include) attr.include = [];
						let include = { model: db[j.table]};
						
						if (j.columns) {include.attributes = j.columns;} // include.seperate = false; true ???
						attr.include.push(include);
						//j.addOptions ???
					});
					//console.log(attr);
					db[svc.table].findAll(attr)
					.then(p => {
						let anObj = {};
						anObj[k] = p;
						resolve(anObj);
					})
					.catch(error => {
						let anObj = {};
						anObj[k] = error;
						resolve(anObj);
					});
				} else if(svc.tables) {
					let multPromises = [];
					svc.tables.forEach(function(t){
						multPromises.push(new Promise(function(resolveMult, rejectMult){
							let attr = t.filter ? t.filter : {};
							if(svc.filterapply && svc.filter && svc.filterapply === t.table) {
								attr = Object.assign({}, t.filter, svc.filter);
							}
							attr.attributes = t.columns;
							if(req.user.role !== "admin" && req.user.role !== "production" && req.user.role !== "seqproduction") {
								if(!attr.where)
									attr.where = {userid:req.user.id};
								else
									attr.where = Object.assign({}, attr.where, {userid:req.user.id});
							}
							//console.log(attr);
							db[t.table].findAll(attr)
							.then(p => {
								resolveMult(p);
							})
							.catch(error => {
								let anObj = {};
								rejectMult(error);
							});
						}));
					});
					Promise.all(multPromises).then( values => {
						let l = values.length, multObj = {}, anObj = {};
						for(var i=0;i<l;i++) {
							Object.keys(values[i][0].dataValues).forEach(function(objkey) {
								multObj[objkey] = values[i][0].dataValues[objkey];
							});
						}
						anObj[k] = multObj;
						resolve(anObj);
					});	
				}
			}));
		});
		Promise.all(promises).then(function(values) {
			let l = values.length;
			for(var i=0;i<l;i++) {
				var k = Object.keys(values[i])[0];
				response.services[k] = values[i][k];
			}
			res.json(response);
		});
	};
};