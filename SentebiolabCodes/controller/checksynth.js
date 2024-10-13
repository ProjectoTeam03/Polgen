module.exports.checksynth = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
		
		
		
		
				let tbl = "", count = 0;
				if(req.body.params.type == "primer") tbl = "primer";
				if(req.body.params.type == "probe") tbl = "probe";
				if(req.body.params.type == "sequence") tbl = "sequence";
				console.log("before await");
				if(tbl) count =  await db[tbl].count({where:{synthid:0}});
				console.log("after await");
				res.json({ok:true, count:count});
				console.log("res");
		};
};