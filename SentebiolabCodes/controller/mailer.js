const nodemailer = require('nodemailer');
const mail = require("../mail")(nodemailer);

module.exports.mailer = (db) => {
	if (db == null)
		return;
	db["primer"].belongsTo(db["primer_fifth"], { foreignKey: "fmod", targetKey: "id", as: "f" });
	db["primer"].belongsTo(db["primer_third"], { foreignKey: "tmod", targetKey: "id", as: "t" });
	db["primer"].belongsTo(db["primer_puri"], { foreignKey: "purification", targetKey: "id", as: "p" });
	db["primer"].belongsTo(db["primer_sca"], { foreignKey: "scale", targetKey: "id", as: "s" });

	db["probe"].belongsTo(db["probe_fifth"], { foreignKey: "fmod", targetKey: "id", as: "f2" });
	db["probe"].belongsTo(db["probe_third"], { foreignKey: "tmod", targetKey: "id", as: "t2" });

	return async function (req, res, next) {
		let tablecontent;
		let mailtable;
		let oligs;
		if (req.body.params.action === "productionMail") {
			try {
				oligs = [];
				mailtable = [];
				if (req.body.params.tbl === "primer") {

					oligs = await db["primer"].findAll({
						raw: true,
						include: [
							{model: db["primer_fifth"], as: "f"},
							{model: db["primer_third"], as: "t"},
							{model: db["primer_puri"], as: "p"},
							{model: db["primer_sca"], as: "s"}
						],
						where: {
							orderid: req.body.params.orderid
						}
					});
					//console.log(oligs);
					oligs.forEach(function (olig) {
						if (olig["f.val"] == null) olig["f.val"] = "---";
						if (olig["t.val"] == null) olig["t.val"] = "---";
						mailtable.push({
							name: olig["name"],
							fmod: olig["f.val"],
							seq: olig["sequence"],
							tmod: olig["t.val"],
							bp: olig["sequence"].length,
							scale: olig["s.val"],
							pur: olig["p.val"]
						});
					});
				} else if (req.body.params.tbl === "probe") {
					oligs = await db["probe"].findAll({
						raw: true,
						include: [
							{model: db["probe_fifth"], as: "f2"},
							{model: db["probe_third"], as: "t2"},
						],
						where: {
							orderid: req.body.params.orderid
						}
					});
					oligs.forEach(function (olig) {
						if (olig["f2.val"] == null) olig["f2.val"] = "---";
						if (olig["t2.val"] == null) olig["t2.val"] = "---";
						mailtable.push({
							name: olig["name"],
							fmod: olig["f2.val"],
							seq: olig["sequence"],
							tmod: olig["t2.val"],
							bp: olig["sequence"].length,
							scale: "200",
							pur: "HPLC"
						});
					});
				} else if (req.body.params.tbl === "sequence") {
					oligs = await db["sequence"].findAll({
						raw: true,
						where: {
							orderid: req.body.params.orderid
						}
					});
					oligs.forEach(function (olig) {
						mailtable.push({
							name: olig["name"],
							fmod: "---",
							seq: "---",
							bp: "---",
							scale: "---",
							pur: "---"
						});
					});
				} else if (req.body.params.tbl === "gene") {
					oligs = await db["gene"].findAll({
						raw: true,
						where: {
							orderid: req.body.params.orderid
						}
					});
					oligs.forEach(function (olig) {
						mailtable.push({
							name: olig["name"],
							fmod: "---",
							seq: olig["sequence"],
							bp: "---",
							scale: "---",
							pur: "---"
						});
					});
				}
				let htmlcontent = req.body.params.content;

				if (req.body.params.lang === "tr") {
					htmlcontent += "<br><br>İyi Çalışmalar<br>" + req.body.params.mailsender + "<br><br>";//<h3>Sipariş Detayları</h3><br>";
					htmlcontent = htmlcontent + "<h3 > Sipariş Ayrıntıları </h3>"
						+ "<hr></br>"
						+ "<table style='width:100%'>"
						+ "<tr>"
						+ "<th>Sipariş Tarihi</th>"
						+ "<th>Ürün Sayısı</th> "
						+ "<th>Sipariş No:</th>"
						+ "</tr>"
						+ "<tr>"
						+ "<td>" + req.body.params.date + "</td>"
						+ "<td>" + req.body.params.productsnum + "</td>"
						+ "<td>" + req.body.params.ordernum + "</td>"
						+ "</tr>"
						+ "</table>"
						+ "</br><hr></br>"
						+ "<table style='width:100%; border-collapse: collapse; border-width: 1px; border-style: solid;'>";
					tablecontent = "<table style='width:100%; border-collapse: collapse; border-width: 1px; border-style: solid;'>"
						+ "<tr><th>Ad</th>"
						+ "<th>5\'</th>"
						+ "<th>Sekans</th>"
						+ "<th>3\'</th>"
						+ "<th>BP</th>"
						+ "<th>Skala</th>"
						+ "<th>Saflaştırma</th></tr>";
				} else if (req.body.params.lang === "en") {
					htmlcontent += "<br><br>Sincerely<br>" + req.body.params.mailsender + "<br><br><h3>Order Details</h3><br>";
					tablecontent = "<table style='width:100%; border-collapse: collapse; border-width: 1px; border-style: solid;'>"
						+ "<tr><th>Name</th>"
						+ "<th>5\'</th>"
						+ "<th>Sequence</th>"
						+ "<th>3\'</th>"
						+ "<th>BP</th>"
						+ "<th>Scale</th>"
						+ "<th>Purification</th></tr>";
				}
				mailtable.forEach(function (row) {
					tablecontent += "<tr>";
					tablecontent +=
						"<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.name + "</td>"
						+ "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.fmod + "</td>"
						+ "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.seq + "</td>"
						+ "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.tmod + "</td>"
						+ "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.bp + "</td>"
						+ "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.scale + "</td>"
						+ "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + row.pur + "</td>";
					tablecontent += "</tr>";
				});
				tablecontent += "</table>";
				htmlcontent += tablecontent;

				let ret = await mail.send([req.body.params.email, "info@sentebiolab.com.tr"], {
					subject: req.body.params.subject,
					html: req.body.params.greeting + ",<br>"
						+ htmlcontent
				});

				res.status(200).send({ok: true, data: ret});

			} catch (err) {
				console.log(err);
				res.status(200).send({ok: false});
			}
		} else if (req.body.params.action === "autoMail") {

			try {
				let tbl = "primer";
				if (req.body.params.type === "probe") tbl = "probe";
				else if (req.body.params.type === "sequence") tbl = "sequence";
				else if (req.body.params.type === "gene") {
					console.log("gene type");
					tbl = "gene";
				}
				let oligs = [];

				let where = {
					orderid: req.body.params.id
				};
				if (req.body.params.mailtype === "cargo") {
					where.id = req.body.params.items;
				}

				if (tbl === "primer") {
					oligs = await db[tbl].findAll({
						raw: true,
						include: [
							{model: db["primer_fifth"], as: "f"},
							{model: db["primer_third"], as: "t"},
							{model: db["primer_puri"], as: "p"},
							{model: db["primer_sca"], as: "s"}
						],
						where: where
					});
				} else if (tbl === "probe") {
					oligs = await db[tbl].findAll({
						raw: true,
						include: [
							{model: db["probe_fifth"], as: "f2"},
							{model: db["probe_third"], as: "t2"}
							//{model:db["primer_puri"], as:"p"},
							//{model:db["primer_sca"], as:"s"}
						],
						where: where
					});

				} else if (tbl === "sequence") {
					oligs = await db[tbl].findAll({
						raw: true,
						where: where
					});
				} else if (tbl === "gene") {
					oligs = await db[tbl].findAll({
						raw: true,
						where: where
					});
				}

				let htmlcontent = "";
				if (req.body.params.mailtype === "new") {
					htmlcontent = "<p>Merhaba,</p></br><p>Bu e-posta otomatik olarak gönderilmiştir. Siparişiniz alınmıştır.</p>";
				} else if (req.body.params.mailtype === "approval") {
					htmlcontent = "<p>Merhaba,</p></br><p>Bu e-posta otomatik olarak gönderilmiştir. Siparişiniz onaylanmıştır.</p>";
				} else if (req.body.params.mailtype === "cargo") {
					htmlcontent = "<p>Merhaba,</p></br><p>Bu e-posta otomatik olarak gönderilmiştir. Siparişleriniz kargoya verilmiştir.</p></br><p>Takip numaranız(Yurtiçi Kargo): <a href = 'https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula'>" + req.body.params.trackid + "</a> tıklayarak takip edebilirsiniz. </p>";
					if (req.body.params.extrainfo != null && req.body.params.extrainfo.length > 0) {
						htmlcontent += "<p>Not: " + req.body.params.extrainfo + "</p>";
					}
				}
				htmlcontent = htmlcontent + "<h3 > Sipariş Ayrıntıları </h3>"
					+ "<hr></br>"
					+ "<table style='width:100%'>"
					+ "<tr>"
					+ "<th>Sipariş Tarihi</th>"
					+ "<th>Ürün Sayısı</th> "
					+ "<th>Sipariş No:</th>"
					+ "</tr>"
					+ "<tr>"
					+ "<td>" + req.body.params.date + "</td>"
					+ "<td>" + req.body.params.productsnum + "</td>"
					+ "<td>" + req.body.params.ordernum + "</td>"
					+ "</tr>"
					+ "</table>"
					+ "</br><hr></br>"
					+ "<table style='width:100%; border-collapse: collapse; border-width: 1px; border-style: solid;'>";
				if (tbl === "primer" || tbl === "probe") {
					htmlcontent += "<tr><th>Ad </th><th>5'</th> <th>Sekans</th><th>3'</th><th>BP</th><th>Skala</th><th>Saflaştırma</th></tr>";
					oligs.forEach(function (k) {
						let fmod = k["f.val"] ? k["f.val"] : k["f2.val"];
						if (!fmod) fmod = "-";
						let tmod = k["t.val"] ? k["t.val"] : k["t2.val"];
						if (!tmod) tmod = "-";
						let puri = (k["p.val"] ? k["p.val"] : "-");
						if (tbl === "probe")
							puri = "HPLC";
						let sca = (k["s.val"] ? k["s.val"] : "-");
						if (tbl === "probe")
							sca = "200 nmol";

						htmlcontent += "<tr><td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + k.name + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + fmod + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + (k.sequence.length > 30 ? k.sequence.substr(0, 30) + "..." : k.sequence) + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + tmod + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + k.sequence.length + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + sca + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + puri + "</td></tr>";
					});
				} else if (tbl === "sequence") {
					htmlcontent += "<tr><th>Ad </th><th>Tip</th> <th>Boyut</th></tr>";
					oligs.forEach(function (k) {
						htmlcontent += "<tr><td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + k.name + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + k.type + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + k.size + "</td></tr>";
					});
				} else if (tbl === "gene") {
					htmlcontent += "<tr><th>Ad </th> <th>Sekans</th></tr>";
					oligs.forEach(function (k) {
						htmlcontent += "<tr><td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + k.name + "</td>";
						htmlcontent += "<td style='border-collapse: collapse; border-width: 1px; border-style: solid;'>" + (k.sequence.length > 30 ? k.sequence.substr(0, 30) + "..." : k.sequence) + "</td></tr>";
					});
				}
				htmlcontent += "</table>";

				let mailsubject = "Üretim Bilgilendirme";

				if (req.body.params.mailtype === "cargo")
					mailsubject = "Sevk Bilgilendirme";
				else if (req.body.params.mailtype === "new")
					mailsubject = "Sipariş Bilgilendirme";

				let ret = await mail.send([req.body.params.email, "info@sentebiolab.com.tr"], {
					subject: mailsubject,
					//text: "Sayın " + req.body.name,
					html: "<h1 style='color:#555555;'>" + mailsubject + "</h1></br>" + htmlcontent
				});
				res.status(200).send({ok: true, data: ret});
			} catch (err) {
				console.log(err);
				res.status(200).send({ok: false});
			}
		}
	};
};
