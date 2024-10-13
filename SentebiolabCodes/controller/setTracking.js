module.exports.setTracking = (db) => {
	
	return async function (req, res, next) {
		if (db == null)
			return;

		try {			
			let tracking = db.tracking.build({
				id: db.sequelize.literal('DEFAULT'),
				name: req.body.params.tracking,
				type: req.body.params.reqtype,
				orderid: req.body.params.orderid,
			});
			let saved = await tracking.save();
			savedid = saved["dataValues"].id;
			
			var update = null;
			
			if (req.body.params.reqtype === "primer") {
				await db.primer.update(
					{
						trackingid: savedid
					},
					{ 
						where:{
							orderid: req.body.params.orderid,
							id : req.body.params.items,
						}
					}
				);
			}
			else if (req.body.params.reqtype === "probe") {
				await db.probe.update(
					{
						trackingid: savedid
					},
					{ 
						where:{
							orderid: req.body.params.orderid,
							id : req.body.params.items,
						}
					}
				);
			}
			else if (req.body.params.reqtype === "sequence") {
				await db.sequence.update(
					{
						trackingid: savedid
					},
					{ 
						where:{
							orderid: req.body.params.orderid,
							id : req.body.params.items,
							ordered: true,
						}
					}
				);
			}
			else if (req.body.params.reqtype === "gene") {
				await db.gene.update(
					{
						trackingid: savedid
					},
					{ 
						where:{
							orderid: req.body.params.orderid,
							id : req.body.params.items,
						}
					}
				);
			}
			
			
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
			return;
		}
		res.status(200).send({ok :'ok'});
  };
};

