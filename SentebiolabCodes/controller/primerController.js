module.exports.primerController = (db) => {
	return async function (req, res) {
		if (db == null)
			return;

		if(req.body.params.primers.length === 0) {
			res.status(200).send({ok :'nok'});
			return;
		}

		let paramUserId = req.session.userId;

		if(req.body.params.userId !== undefined) {

			paramUserId = req.body.params.userId
		}


		let coupon = await db.users.findAll(
			{
				attributes: ["couponid"],
				limit: 1,
				where: { userid:  paramUserId}
			}
		);

		let uCouponId = coupon[0].dataValues["couponid"];

		let psPromises = [];
		req.body.params.primers.forEach(function(t){
			psPromises.push(new Promise(function(resolveMult){
				db["primer_price"].findAll({
					attributes: ["val"],
					limit: 1,
					where: {
						puriid: t["purification"],
						scaid: t["scale"],
						couponid : [1,uCouponId]
					},
					order: [[ "couponid" , "DESC" ]]
				})
				.then(p => {
					resolveMult({primer : t, val: p[0].dataValues["val"]});
				})
				.catch(error => {
					console.log(error);
				});
			}));
		});

		Promise.all(psPromises).then( values => {
			let l = values.length;

			for(let i=0; i<l; i++) {
				let Icount = countchar(values[i].primer["sequence"], "I");
				let templength = (values[i].primer["sequence"].length) - Icount;
				if (templength < 15)
					templength = 15;
				values[i].primer["cost"] = Number.parseFloat((templength * values[i].val) + (Icount * 11.99)).toFixed(2);

			}

			let ftPromises = [];
			req.body.params.primers.forEach(function(t){

				if (t["fmod"] && t["fmod"] !== "0"){
					ftPromises.push(new Promise(function(resolveMult){
						db["primer_fifth"].findAll({
							attributes: ["costval"],
							limit: 1,
							where: {
								id : t["fmod"]
							}
						})
						.then(p => {
							resolveMult({primer : t, val: p[0].dataValues["costval"]});
						})
						.catch(error => {
							console.log(error);
						})
					}));
				} else if (t["tmod"] && t["tmod"] !== "0"){
					ftPromises.push(new Promise(function(resolveMult){
						db["primer_third"].findAll({
							attributes: ["costval"],
							limit: 1,
							where: {
								id : t["tmod"]
							}
						})
						.then(p => {
							resolveMult({primer : t, val: p[0].dataValues["costval"]});
						})
						.catch(error => {
							console.log(error);
						})
					}));
				}

			});
			Promise.all(ftPromises).then(async ftvalues => {
				let ftl = ftvalues.length;
				for(let j=0; j<ftl; j++) {
					ftvalues[j].primer["cost"] = Number(ftvalues[j].primer["cost"]) + Number(ftvalues[j].val);
				}

				let exists;
				try {
					exists = await db["orders"].findAll({
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
				for(let i in req.body.params.primers) {
					tlength += req.body.params.primers[i]["sequence"].length;
					tcost += Number(req.body.params.primers[i]["cost"]);
				}
				tcost = Number.parseFloat(tcost).toFixed(2);

				let orderid;
				if (exists.length === 0) {
					let userInfo = await db.users.findOne({
						attributes: ["company","name","ordernum"],
						where : {
							userid: paramUserId,
						}
					})
					let ordernum = userInfo.dataValues.company + " - " + userInfo.dataValues.name + "-" + userInfo.dataValues.ordernum.toStrLen(4)


					let order = db.orders.build({
						id: db.sequelize.literal('DEFAULT'),
						type: 'primer',
						ordernum: ordernum, // generate this
						productsnum: req.body.params.primers.length,
						totalbp: tlength,
						totalcost: tcost, // calculate cost for each primer
						completed: 0,
						approval: false,
						date: db.sequelize.literal('NOW()'),
						userid: paramUserId,
						orderdone: false
					});
					let savedorder = await order.save();
					orderid = savedorder["dataValues"].id;

				} else {
					await db.orders.update(
						{
							type: 'primer', // generate this
							productsnum: req.body.params.primers.length,
							totalbp: tlength,
							totalcost: tcost, // calculate cost for each primer
							date: db.sequelize.literal('NOW()'),
						},
						{
							where: { id: exists[0].dataValues.id }
						}
					);
					orderid = exists[0].dataValues.id;
				}

				try {
					await db["primer_temporary"].destroy({
						where:{
							orderitem: true,
							userid: paramUserId
						}
					});

				} catch(err) {
					console.log(err);
					res.status(200).send({ok :'nok'});
					return;
				}

				try {
					//may want to check primer validity here
					for(let i in req.body.params.primers) {
						if(req.body.params.primers[i]["fmod"] === "" || req.body.params.primers[i]["fmod"] === "0")
							req.body.params.primers[i]["fmod"] = 0;

						if(req.body.params.primers[i]["tmod"] === "" || req.body.params.primers[i]["tmod"] === "0")
							req.body.params.primers[i]["tmod"] = 0;

						req.body.params.primers[i]["orderitem"] = true;
						req.body.params.primers[i]["userid"] = paramUserId;
					}
					await db.primer_temporary.bulkCreate(
						req.body.params.primers, { validate: true }
					);

				} catch(err) {
					console.log(err);
					res.status(200).send({ok :'nok'});
					return;
				}

				res.status(200).send({ok :'ok',orderid: orderid});

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
