module.exports.saveGene = (db) => {
	return async function (req, res, next) {
	if (db == null) return;
		try {
			await db["gene_temporary"].destroy({
				where: {
					orderitem: false,
					userid: req.session.userId
				}
			});

		} catch (err) {
			console.log(err);
			res.status(200).send({ok: 'nok'});
			return;
		}

		try {
			for(let i in req.body.params.genes) {
				req.body.params.genes[i]["orderitem"] = false;
				req.body.params.genes[i]["cost"] = 0;
				req.body.params.genes[i]["userid"] = req.session.userId;
			}
			if("gene_temporary" in db)
			await db.gene_temporary.bulkCreate(
				req.body.params.genes, { validate: true }
			);
			
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		
		res.status(200).send({ok :'ok'});
  };
};

