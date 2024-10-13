module.exports.synth = (db) => {

	return async function (req, res) {
		if (db == null) return;

		if(req.body.params.action === "create") {

			let lastsynth, synthnum = 1;
			const d = new Date();
			let month = d.getMonth()+1;
			let day = d.getDate();
			let year = ( "" + d.getFullYear()).substr(2,3);
			let output = year + ((''+month).length<2 ? '0' : '') + month + ((''+day).length<2 ? '0' : '') + day + "-";

			try {
				lastsynth = await db["synth"].findAll({
					attributes: ["name"],
					order:[
						["name","DESC"]
					],
					limit: 1,
					where: {
						name: {
						  $like: output + "%"
						}
					}
				});
			} catch(err) {
				console.log(err);
			}

			if(lastsynth.length !== 0) {
				synthnum = parseInt(lastsynth[0].name.split("-")[1]) + 1;
			}

			output = output + synthnum;
			let newsynth;
			try {
				newsynth = await db["synth"].build({
					id: db.Sequelize.literal("DEFAULT"),
					name: output,
					type: req.body.params.type,
					date: db.Sequelize.literal("NOW()"),

					pcount: req.body.params.pcount,
					scale: req.body.params.scale,
					bp: req.body.params.bp,

					dsltn: req.body.params.dsltn,
					opcn: req.body.params.opcn,
					hplcn: req.body.params.hplcn,

					fill: req.body.params.fill

				}).save();
			} catch(err) {
				console.log(err);
			}

			res.status(200).send({ok :'ok', id:newsynth.id, name:newsynth.name});

		} else if(req.body.params.action === "delete") {
			try {
				let s = await db["synth"].findOne({where: { id:  req.body.params.id}})
				s.destroy().then(() => {
					res.status(200).send({ok :'ok', id:req.body.params.id });
				}).catch((e) => {
					console.log(e);
					res.status(200).send({ok :'nok', id:req.body.params.id });
				});
			} catch(er) {
				console.log(er);
				res.status(200).send({ok :'nok', id:req.body.params.id });
			}
		} else if(req.body.params.action === "name") {
			try {
				await db.synth.update({
						name: req.body.params.name,
					},
					{
						where: { id: req.body.params.id }
					}
				);
				res.status(200).send({ok :'ok'});

			} catch(err) {
				console.log(err);
				res.status(200).send({ok :'nok'});

			}
		}
	};
};
