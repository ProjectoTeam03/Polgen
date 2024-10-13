module.exports.saveProbe = (db) => {
	
	return async function (req, res, next) {
		if (db == null)
			return;
		try {
			await db["probe_temporary"].destroy({
				where:{
					orderitem: false,
					userid: req.session.userId
				}
			});
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		try {			
			for(let i in req.body.params.probes) {
				req.body.params.probes[i]["orderitem"] = false;
				req.body.params.probes[i]["cost"] = 0;
				req.body.params.probes[i]["userid"] = req.session.userId;
			}
			await db.probe_temporary.bulkCreate(
				req.body.params.probes, { validate: true }
			);
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		res.status(200).send({ok :'ok'});
  };
};

