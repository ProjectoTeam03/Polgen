module.exports.orderPrimer = (sdb) => {

	return async function (req, res) {
		if (sdb == null)
			return;
		if(req.body.params.primers.length === 0) {
			res.status(400).send({ok :'nok'});
			return;
		}

		let paramUserId = req.session.userId;
		if(req.body.params.userId !== undefined) {
			paramUserId = req.body.params.userId
		}

		let paramDate = sdb.sequelize.literal('NOW()');

		if(req.body.params.date !== undefined) {
			paramDate = req.body.params.date;
		}

		let coupon = await sdb.users.findAll({
				attributes: ["couponid"],
				limit: 1,
				where: { userid:  paramUserId}
		});

		let uCouponId = coupon[0].dataValues["couponid"];

		let psPromises = [];
		req.body.params.primers.forEach(function(t){
			psPromises.push(new Promise(function(resolveMult){
				sdb["primer_price"].findAll({
					attributes: ["val"],
					limit: 1,
					where: {
						puriid: t["purification"],
						scaid: t["scale"],
						couponid : [1,uCouponId]
					},
					order: [[ "couponid" , "DESC" ]]
				}).then(p => {
					resolveMult({primer : t, val: p[0].dataValues["val"]});
				}).catch(error => {
					console.log(error);
				});
			}));
		});

		Promise.all(psPromises).then( values => {
			let l = values.length;

			for(let i=0;i<l;i++) {
				let Icount = countchar(values[i].primer["sequence"],"I");
				let templength = (values[i].primer["sequence"].length) - Icount;
				if (templength<15) templength = 15;
				values[i].primer["cost"] = Number.parseFloat( (templength * values[i].val) + (Icount * 11.99) ).toFixed(2);
			}
			let ftPromises = [];
			req.body.params.primers.forEach(function(t){
				if (t["fmod"] && t["fmod"] !== "0"){
					ftPromises.push(new Promise(function(resolveMult){
						sdb["primer_fifth"].findAll({
							attributes: ["costval"],
							limit: 1,
							where: {
								id : t["fmod"]
							}
						}).then(p => {
							resolveMult({primer : t, val: p[0].dataValues["costval"]});
						}).catch(error => {
							console.log(error);
						})
					}));
				} else if (t["tmod"] && t["tmod"] !== "0"){
					ftPromises.push(new Promise(function(resolveMult){
						sdb["primer_third"].findAll({
							attributes: ["costval"],
							limit: 1,
							where: {
								id : t["tmod"]
							}
						}).then(p => {
							resolveMult({
								primer : t,
								val: p[0].dataValues["costval"]
							});
						}).catch(error => {
							console.log(error);
						})
					}));
				}
			});
			Promise.all(ftPromises).then(async ftvalues => {
				let i;
				let ftl = ftvalues.length;
				for(let j=0;j<ftl;j++) {
					ftvalues[j].primer["cost"] = Number(ftvalues[j].primer["cost"]) + Number(ftvalues[j].val);
				}

				let exists;
				try {
					exists = await sdb["orders"].findAll({
						attributes: ["id"],
						limit: 1,
						where:{
							orderdone: false,
							userid: paramUserId
						}
					});
				} catch(err) {
					console.log(err);
				}
				let tlength = 0;
				let tcost = 0;

				let tempscale = 0;

				for(i in req.body.params.primers) {
					tlength += req.body.params.primers[i]["sequence"].length;
					tcost += Number(req.body.params.primers[i]["cost"]);

					if(tempscale === 0 ) {
						tempscale = req.body.params.primers[i]["scale"];
					} else {
						if (tempscale !== req.body.params.primers[i]["scale"]) {
							tempscale = -1;
						}
					}
				}
				tcost = Number.parseFloat(tcost).toFixed(2);

				if(tempscale === -1)
					tempscale = 0;

				let orderid = 0;
				if (exists.length === 0) {
					res.status(400).send({ok :'nok was sent because of exists.length === 0'});
					return;
				} else {
					await sdb.orders.update({
							type: 'primer',
							productsnum: req.body.params.primers.length,
							totalbp: tlength,
							totalcost: tcost, // calculate cost for each primer
							date: paramDate,
							orderdone: true,
							info: req.body.params.info,
							address: req.body.params.address,
							scale: tempscale,
							bill: req.body.params.bill,
							taxoffice: req.body.params.taxoffice,
							taxnumber: req.body.params.taxnumber,
							project: req.body.params.project
						},
						{
							where: { id: exists[0].dataValues.id }
						}
						);
					orderid = exists[0].dataValues.id;
				}
				if(orderid === 0) {
					console.log("WTF")
				} else {
					let userInfo = await sdb.users.findOne({
						attributes: ["ordernum"],
						where : {
							userid: paramUserId,
						}
					})
					console.log(userInfo)
					await sdb.users.update({
							ordernum: (userInfo.dataValues.ordernum + 1)
						},
						{
							where: { userid:paramUserId }
						});
				}
				try {
					await sdb["primer_temporary"].destroy({
						where:{
							orderitem: true,
							userid: paramUserId
						}
					});
				} catch(err) {
					console.log(err);
					res.status(500).send({ok :'nok is sent because of ' + err});
					return;
				}

				try {
					//may want to check primer validity here
					for(i in req.body.params.primers) {
						req.body.params.primers[i]["id"] = sdb.sequelize.literal('DEFAULT');
						if(req.body.params.primers[i]["fmod"] === "" || req.body.params.primers[i]["fmod"] === "0") req.body.params.primers[i]["fmod"] = null;
						if(req.body.params.primers[i]["tmod"] === "" || req.body.params.primers[i]["tmod"] === "0") req.body.params.primers[i]["tmod"] = null;
						//if(req.body.params.primers[i]["purification"] == "2") {console.log("derp"); req.body.params.primers[i]["dmt"] = true;}
						req.body.params.primers[i]["orderid"] = orderid;
						req.body.params.primers[i]["userid"] = paramUserId;
						req.body.params.primers[i]["orderid2"] = orderid;
					}
					await sdb.primer.bulkCreate(
						req.body.params.primers, { validate: true }
					);
				} catch(err) {
						console.log(err);
						res.status(500).send({ok :'nok is sent because of ' + err});
						return;
				}
				res.status(200).send({ok :'ok', ordernum: orderid});
			});
		});
	};
};

function countchar (str, ch){
	let c = 0;
	for (let i = 0; i < str.length; i++){
		if (str[i] === ch)
			c++;
	}
	return c;
}
