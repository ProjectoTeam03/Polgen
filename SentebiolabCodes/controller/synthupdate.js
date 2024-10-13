module.exports.synthupdate = (db) => {
	return async function (req, res, next) {
		if (db == null) return;

		const v = req.body.params.synthvals;
		try {
			await db.synth.update(
				{
					pcount: v.pcount,
					scale: v.scale,
					bp: v.bp,
					
					dsltn: v.dslt.n,
					opcn: v.opc.n,
					hplcn: v.hplc.n,
					
					dsltaod: v.dslt.aod,
					opcaod: v.opc.aod,
					hplcaod: v.hplc.aod,
					
					dsltanmol: v.dslt.anmol,
					opcanmol: v.opc.anmol,
					hplcanmol: v.hplc.anmol,
					
					minod: v.minod,
					maxod: v.maxod,
					minnmol: v.minnmol,
					maxnmol: v.maxnmol,
					
					fill: (100*(v.pcount)/96).toFixed(2),
					repeat: v.repeat
				},
				{
					where: { id: req.body.params.synthid }
				}
			);
			res.status(200).send({ok :'ok'});
		} catch(err) {
			console.log(err);
			res.status(200).send({ok :'nok'});
		}
	};
};