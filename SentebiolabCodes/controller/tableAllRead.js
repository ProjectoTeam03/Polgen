module.exports.tableAllRead = (db) => {
	
	return async function (req, res, next) {
		if (db == null)
			return;
		let allowedTables = ["price", "schedule", "primer_fifth", "primer_third", "primer_puri", "primer_sca",
			"primer_price", "probe_fifth", "probe_third", "probe_pair"];
		let response = {
			type: req.body.type,
			ok: true,
			services: {}
		};
		let promises = [];
		Object.keys(req.body.services).forEach(function(k) {
			const svc = req.body.services[k];
			promises.push(new Promise(function(resolve, reject) {
				if(allowedTables.find(function(t){return svc.table == t})){
					let attr = svc.filter ? svc.filter : {};
					attr.attributes = svc.columns;
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
				} else {
					resolve({});
				}
			}));
		});
		Promise.all(promises).then(function(values) {
			const l = values.length;
			for(let i=0; i<l; i++) {
				const k = Object.keys(values[i])[0];
				response.services[k] = values[i][k];
			}
			res.json(response);
			//next();
		});
	};
};