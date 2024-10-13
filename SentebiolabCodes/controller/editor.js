module.exports.editor = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		
		
		//console.log(req.body);
		
		let response = {
			type: req.body.type,
			ok: true,
			services: {}
		};
		let promises = [];
		Object.keys(req.body.services).forEach(function (k) {
			var svc = req.body.services[k];
			promises.push(new Promise(function (resolve, reject) {

				if (!svc.action) {
					let attr = svc.filter ? svc.filter : {};
					if (attr.where) {
						Object.keys(attr.where).forEach(function (wherekey) {
							if (typeof attr.where[wherekey] == "object" && attr.where[wherekey]) {
								//console.log(wherekey, attr.where[wherekey]);
								var whereobj = attr.where[wherekey];
								var op = function (wop) {
									if (wop == "not") return db.sequelize.Op.ne;
									else if (wop == "eq") return db.sequelize.Op.eq;
									else if (wop == "between") return db.sequelize.Op.between;
									else if (wop == "in") return db.sequelize.Op.in;
									else return wop;
								}(whereobj.op);
								if(!attr.where["$" + wherekey + "$"]) attr.where["$" + wherekey + "$"] = {};
								attr.where["$" + wherekey + "$"][op] = whereobj.val;
								delete attr.where[wherekey];
							}
						});
					}
					attr.attributes = [];
					//var groupflag = false;
					//var group = [];
					svc.columns.forEach(function (c) {
						if (typeof c == "object") {
							//groupflag = true;
							
							var colstr = svc.table + "." + c.col;
							if (c.table) colstr = c.table + "." + c.col;
							//console.log("f: ", colstr);
							var fnArr = [];
							fnArr.push(db.sequelize.fn(c.fn, db.sequelize.col(colstr)));
							fnArr.push(c.as);
							attr.attributes.push(fnArr);
						} else {
							attr.attributes.push(c);
							//group.push(c);
						}
					});
					if (svc.group) {
						attr.group = svc.group;
						if (Array.isArray(svc.group)) {
							var where = {};
							svc.group.forEach(function (elm) {	// TODO: Exclude the joined empty rows
								where["$" + elm + "$"] = { $ne: null };
							});
							attr.where = Object.assign({}, attr.where, where);
						}
					}
					if (svc.order) {
						attr.order = [];
						svc.order.forEach(function (ord) {
							attr.order.push(db.sequelize.literal(ord));
						});
						//attr.order = [db.sequelize.literal('orders.type ASC'), db.sequelize.literal('orders.id DESC')]
					}
					/*if(groupflag) {
						attr.group = group;
					}*/
					//attr.attributes = svc.columns;
					if (req.user.role != "admin" && req.user.role != "production" && req.user.role != "seqproduction") {//TODO this is pathetic
						if (!attr.where) attr.where = { userid: req.user.id };
						else attr.where = Object.assign({}, attr.where, { userid: req.user.id });
					}
					//console.log(attr.where);
					let optionpromises = [];
					let options = {};
					if (svc.join) svc.join.forEach(function (j) {
						db[svc.table].belongsTo(db[j.table], {/*as: j.alias,*/ foreignKey: j.foreign, targetKey: j.target,  }); //options: {where: j.where}
						if (!attr.include) attr.include = [];
						let include = { model: db[j.table]};
						
						if (j.columns != null) {include.attributes = j.columns;} // include.seperate = false; true ???
						if (j.where != null) {
							Object.keys(j.where).forEach(function (wherekey) {
								if (typeof j.where[wherekey] == "object" && j.where[wherekey]) {
									var whereobj = j.where[wherekey];
									var op = function (wop) {
										if (wop == "not") return db.sequelize.Op.ne;
										else if (wop == "eq") return db.sequelize.Op.eq;
										else if (wop == "between") return db.sequelize.Op.between;
										else return wop;
									}(whereobj.op);
									if(!j.where["$" + wherekey + "$"]) j.where["$" + wherekey + "$"] = {};
									j.where["$" + wherekey + "$"][op] = whereobj.val;
									delete j.where[wherekey];
								}
							});
							
							include.where = j.where;
						} // include.seperate = false; true ???
						if (j.required != null) {include.required = j.required;}
						attr.include.push(include);
						
						if (j.addoptions) {
							optionpromises.push(new Promise(function (optresolve, optreject) {
								db[j.table].findAll({
									attributes: [j.addoptions.value, j.addoptions.label]
								}).then(d => {
									let anObj = {};
									anObj[j.datakey] = d.map(opt => {
										let newOpt = {};
										newOpt.value = opt[j.addoptions.value];
										newOpt.label = opt[j.addoptions.label];
										return newOpt;
									});
									optresolve(anObj);
								}).catch(e => {
									let anObj = {};
									anObj[j.datakey] = e;
									optresolve(e);
								});
							}));
						}
					});
					Promise.all(optionpromises).then(function (vals) {
						let l = vals.length;
						for (var ii = 0; ii < l; ii++) {
							var kk = Object.keys(vals[ii]);
							options[kk] = vals[ii][kk];
						}
						db[svc.table].findAll(attr)
							.then(p => {
								//console.log(options);
								let anObj = {};
								anObj[k] = {};
								anObj[k].data = p;
								if (Object.keys(options).length > 0) anObj[k].options = options;
								//console.log(anObj);
								resolve(anObj);
							}).catch(error => {
								let anObj = {};
								anObj[k] = error;
								resolve(anObj);
							});

					});
				} else if (svc.action == "edit") {
					let anObj = {};
					anObj[k] = {};
					anObj[k].action = "edit";

					let editpromises = [];
					svc.fields.forEach(function (row) {
												
						if (row.where.id) {
							editpromises.push(new Promise(function (editresolve, editreject) {
								Object.keys(row.fields).forEach(function (fieldKey) {
									if (svc.join) {
										svc.join.forEach(function (join) {
											if (fieldKey == join.table || fieldKey + "s" == join.table) {
												if (row.fields[fieldKey].id == "") row.fields[join.foreign] = null;
												else row.fields[join.foreign] = row.fields[fieldKey].id;
												delete row.fields[fieldKey];
											}
										});
									}
									if(row.fields[fieldKey] == "null" || row.fields[fieldKey] === "" ) {
										//console.log(fieldKey + "set to null")
										row.fields[fieldKey] = null;
									} 
								});
																																
								var additionalwhere = {};
								if (req.user.role != "admin" && req.user.role != "production" && req.user.role != "seqproduction") {//TODO this is pathetic
									additionalwhere.userid = req.user.id;
								}
								db[svc.table].update(
									row.fields,
									{
										fields: Object.keys(row.fields),
										where: Object.assign({}, additionalwhere, row.where)
									}
								).then(() => {
									//console.log(row);
									//console.log(row.where.id);
									editresolve({ id: row.where.id, ok: true });
								}).catch((err) => {
									console.log("catch " + err);
									editresolve({ id: row.where.id, ok: false });
								});
							}));
						}
						Promise.all(editpromises).then(function (editvals) {
							//console.log(editvals);
							let attr = svc.filter ? svc.filter : {};
							attr.attributes = svc.columns;

							if (svc.join) svc.join.forEach(function (j) {
								db[svc.table].belongsTo(db[j.table], { foreignKey: j.foreign, targetKey: j.target });
								if (!attr.include) attr.include = [];
								attr.include.push({ model: db[j.table] });
							});

							if (req.user.role != "admin" && req.user.role != "production" && req.user.role != "seqproduction") {//TODO this is pathetic
								if (!attr.where) attr.where = { userid: req.user.id };
								else attr.where = Object.assign({}, attr.where, { userid: req.user.id });
							}

							if (attr.where != null) {
								Object.keys(attr.where).forEach(function (wherekey) {
									
									if (typeof attr.where[wherekey] == "object" && attr.where[wherekey] && wherekey != "id") {
										var whereobj = attr.where[wherekey];
										var op = function (wop) {
											if (wop == "not") return db.sequelize.Op.ne;
											else if (wop == "eq") return db.sequelize.Op.eq;
											else if (wop == "between") return db.sequelize.Op.between;
											else if (wop == "in") return db.sequelize.Op.in;
											else return wop;
										}(whereobj.op);
										if(!attr.where["$" + wherekey + "$"]) attr.where["$" + wherekey + "$"] = {};
										attr.where["$" + wherekey + "$"][op] = whereobj.val;
										delete attr.where[wherekey];
									}
								});
							}
							
							let l = editvals.length;
							if (!attr.where) attr.where = {};
							attr.where.id = [];
							for (var i = 0; i < l; i++) {
								attr.where.id.push(editvals[i].id);
							}
										
							db[svc.table].findAll(attr)
								.then(p => {
									let anotherObj = {};
									anotherObj[k] = {};
									anotherObj[k].action = "edit";
									anotherObj[k].data = p;
									//console.log(anotherObj);
									resolve(anotherObj);
								}).catch(error => {
									let anotherObj = {};
									anotherObj[k] = {};
									anotherObj[k].action = "edit";
									anotherObj[k].data = {};
									//console.log("error");
									//anotherObj[k] = error;
									resolve(anotherObj);
								});
						});
					});
				} else if (svc.action == "create") {
										
					let createpromises = [];
					svc.fields.forEach(function (row) {
						createpromises.push(new Promise(function (createresolve, createreject) {
							Object.keys(row.fields).forEach(function(f){
								if(typeof row.fields[f] == "object" && row.fields[f] && row.fields[f].id) {
									if(svc.join) svc.join.forEach(function (j) {
										if(j.table == f || j.table == f + "s") {
											row.fields[j.foreign] = row.fields[f].id;
											delete row.fields[f];
										}
									});
								} else if(!row.fields[f] || (typeof row.fields[f] == "object" && !row.fields[f].id) || f == "null" ) {
									delete row.fields[f];
								} 
								
								if (req.user.role != "admin" && req.user.role != "production" && req.user.role != "seqproduction") {//TODO this is pathetic
									if (f == "userid") {
										row.fields[f] = req.user.id;
									}
								}
								
							});
							row.fields.id = db.sequelize.literal('DEFAULT');
							
							db[svc.table].build(row.fields).save().then(contprimer => {
								createresolve(contprimer);
							})
							.catch(error => {
								// Ooops, do some error-handling
								console.log(error);
							})
							
						}));
						Promise.all(createpromises).then(function (createvals) {
							let lastpromises = [];
							createvals.forEach(function(createval){
								lastpromises.push(new Promise(function (lastresolve, lastreject) {
									let keypromises = [];
									if(svc.join) svc.join.forEach(function (j) {
										//console.log(j.table, j.foreign,createval[j.foreign]);
										if (createval[j.foreign]) {
											db[svc.table].belongsTo(db[j.table], { foreignKey: j.foreign, targetKey: j.target });
											keypromises.push(new Promise(function (keyresolve, keyreject) {
												//console.log(j.table, j.foreign,createval[j.foreign]);
												db[j.table].findAll({
													where: {id: createval[j.foreign]}
												}).then(d => {
													//console.log(d);
													let anObj = {};
													anObj[j.foreign] = d;
													keyresolve(anObj);
												}).catch(e => {
													let anObj = {};
													anObj[j.foreign] = e;
													keyresolve(e);
												});
											}));
										}
									});
									Promise.all(keypromises).then(function(keyvals){
										Object.keys(createval.dataValues).forEach(function(createvalkey){
											keyvals.forEach(function(keyval){
												if(keyval[createvalkey]) {
													//console.log(keyval[createvalkey]);
													svc.join.forEach(function (jj) {
														let singulartname = jj.table;
														if(singulartname[singulartname.length -1] == "s" || singulartname[singulartname.length -1] == "S") singulartname.substring(0, singulartname.length-1);
														if(jj.foreign == createvalkey) createval.dataValues[singulartname] = keyval[createvalkey][0];
													});
												}
											});
										});
										lastresolve(createval);
									});
								}));
							});
							Promise.all(lastpromises).then(function(lastvals){
								let anotherObj = {};
								anotherObj[k] = {};
								anotherObj[k].action = "create";
								anotherObj[k].data = lastvals;
								resolve(anotherObj);
							});
						});
					});
				} else if (svc.action == "remove") {
					let removepromises = [];
					svc.fields.forEach(function (row) {
						if (row.where && row.where.id ) {
							removepromises.push(new Promise(function (removeresolve, removereject) {
								db[svc.table].destroy({
									where : {
										id: row.where.id
									}
								}).then(contprimer => {
									//console.log("remove successful");
									//console.log(contprimer);
									removeresolve(contprimer);
								})
								.catch(error => {
									console.log(error);
								})
								
						}));
						}
					});

					Promise.all(removepromises).then(function (vals) {

						let anObj = {};
						anObj[k] = {};
						anObj[k].data = vals;
						anObj[k].action = "remove";
						resolve(anObj);

					});

				}
			}));
		});
		Promise.all(promises).then(function (values) {
			
			//console.log(values)
			
			let l = values.length;
			for (var i = 0; i < l; i++) {
				var k = Object.keys(values[i]);
				response.services[k] = values[i][k];
			}
			res.json(response);
			//next();
		}).catch(function (err) {
			console.log(err);
		});

	};
};