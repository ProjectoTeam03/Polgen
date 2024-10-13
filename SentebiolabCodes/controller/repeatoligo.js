module.exports.repeatoligo = (db) => {
	return async function (req, res, next) {
		let temp;
		let newitems;
		let orderid;
		let savedorder;
		let order;
		let pnum;
		let tbp;
		let orderInfo;
		let orderids;
		let i;
		if (db == null) return;
		
		if(req.body.params.items.length === 0) {
			res.status(200).send({ok :'nok'});
			return;
		}
		
		if(req.body.params.type === "primer") {
			orderids = [];
			for(i in req.body.params.items) {
				if (req.body.params.items[i]["orderid"] !== 0  && orderids.includes(req.body.params.items[i]["orderid"]) === false) {
					orderids.push(req.body.params.items[i]["orderid"]);
				}
			}
			
			try {
				for (let j in orderids) {
					orderInfo = await db.orders.findOne({
						attributes: ["ordernum","userid"],
						where : {
							id: orderids[j],
						}
					});
					
					tbp = 0;
					let scale = 0;
					pnum = 0;

					for(i in req.body.params.items) {
						
						if(req.body.params.items[i]["orderid"] === orderids[j]) {
							pnum = pnum +1;
							tbp += req.body.params.items[i]["sequence"].length;
							if (scale === 0)
								scale = req.body.params.items[i]["scale"];
							else if (scale !== req.body.params.items[i]["scale"])
								scale = -1;
						}
					}

					if (scale === -1) scale = 0;

					order = db.orders.build({
						id: db.sequelize.literal('DEFAULT'),
						type: 'primer',
						ordernum: "GT " + orderInfo.dataValues.ordernum, // generate this
						productsnum: pnum,
						totalbp: tbp,
						totalcost: 0, // calculate cost for each probe
						completed: 0,
						approval: true,
						date: db.sequelize.literal('NOW()'),
						userid: orderInfo.dataValues.userid,
						scale: scale,
						orderdone: true,
						address: orderInfo.dataValues.address,
						info: orderInfo.dataValues.info
					});
					savedorder = await order.save();
					orderid = savedorder["dataValues"].id;
					
					for(i in req.body.params.items) {
						newitems = [];
						if(req.body.params.items[i]["orderid"] === orderids[j]) {
							temp = {};
							temp["id"] = db.sequelize.literal('DEFAULT');
							temp["fmod"] = req.body.params.items[i]["fmod"];
							temp["name"] = req.body.params.items[i]["name"];
							temp["sequence"] = req.body.params.items[i]["sequence"];
							temp["tmod"] = req.body.params.items[i]["tmod"];
							temp["orderid"] = orderid;
							//temp["orderid2"] = orderid;
							temp["userid"] = req.body.params.items[i]["userid"];
							temp["scale"] = req.body.params.items[i]["scale"];
							temp["purification"] = req.body.params.items[i]["purification"];
							newitems.push(temp);
							
							await db.primer.bulkCreate(
								newitems, { validate: true }
							);
							
						}
						await db.primer.update(
							{
								repeat: ( Number(req.body.params.items[i]["repeat"]) + 1)
							},
							{ 
								where: { id: req.body.params.items[i]["id"] }
							}
						);
						
					}
					

					
				}
			} catch(err) {
				console.log(err);
				res.status(200).send({ok :'nok'});
				return;
			}
		} else if(req.body.params.type === "probe") {

			orderids = [];

			for(i in req.body.params.items) {
				
				if (req.body.params.items[i]["orderid"] !== 0  && orderids.includes(req.body.params.items[i]["orderid"]) === false) {
					orderids.push(req.body.params.items[i]["orderid"]);
				}
				
			}
			
			try {
				for (let j in orderids) {
					orderInfo = await db.orders.findOne({
						attributes: ["ordernum", "userid"],
						where: {
							id: orderids[j],
						}
					});

					tbp = 0;
					pnum = 0;
					for(i in req.body.params.items) {
						if(req.body.params.items[i]["orderid"] === orderids[j]) {
							pnum = pnum +1;
							tbp += req.body.params.items[i]["sequence"].length;
						}
					}
					order = db.orders.build({
						id: db.sequelize.literal('DEFAULT'),
						type: 'probe',
						ordernum: "GT " + orderInfo.dataValues.ordernum, // generate this
						productsnum: pnum,
						totalbp: tbp,
						totalcost: 0, // calculate cost for each probe
						completed: 0,
						approval: true,
						date: db.sequelize.literal('NOW()'),
						userid: orderInfo.dataValues.userid,
						scale: 3,
						orderdone: true,
						address: orderInfo.dataValues.address,
						info: orderInfo.dataValues.info
					});
					savedorder = await order.save();
					orderid = savedorder["dataValues"].id;

					for(i in req.body.params.items) {
						newitems = [];
						if(req.body.params.items[i]["orderid"] === orderids[j]) {
							temp = {
								"id": db.sequelize.literal('DEFAULT'),
								"fmod": req.body.params.items[i]["fmod"],
								"name": req.body.params.items[i]["name"],
								"sequence": req.body.params.items[i]["sequence"],
								"tmod": req.body.params.items[i]["tmod"],
								"orderid": orderid,
								"userid": req.body.params.items[i]["userid"]
							}
							newitems.push(temp);
							await db.probe.bulkCreate(
								newitems, { validate: true }
							);
							
						}
						await db.probe.update(
							{
								repeat: ( Number(req.body.params.items[i]["repeat"]) + 1)
							},
							{ 
								where: { id: req.body.params.items[i]["id"] }
							}
						);
					}}
			} catch(err) {
				console.log(err);
				res.status(200).send({ok :'nok'});
				return;
			}
		}
		res.status(200).send({ok :'ok'});
	};
};
