module.exports.savePrimer = (db) => {
	
	return async function (req, res, next) {
		if (db == null)
			return;
		try {
			await db["primer_temporary"].destroy({
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
			for(var i in req.body.params.primers) {
				if(req.body.params.primers[i]["fmod"] === "" || req.body.params.primers[i]["fmod"] === "0")
					req.body.params.primers[i]["fmod"] = 0;
				if(req.body.params.primers[i]["tmod"] === "" || req.body.params.primers[i]["tmod"] === "0")
					req.body.params.primers[i]["tmod"] = 0;
				if(req.body.params.primers[i]["purification"] === "")
					req.body.params.primers[i]["purification"] = db.sequelize.literal('NULL');
				if(req.body.params.primers[i]["scale"] === "")
					req.body.params.primers[i]["scale"] = db.sequelize.literal('NULL')

				req.body.params.primers[i]["orderitem"] = false;
				req.body.params.primers[i]["cost"] = 0;
				req.body.params.primers[i]["userid"] = req.session.userId;
			}
			await db.primer_temporary.bulkCreate(
				req.body.params.primers, { validate: true }
			);
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		res.status(200).send({ok :'ok'});
  };
};

