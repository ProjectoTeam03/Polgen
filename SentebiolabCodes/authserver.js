const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
const pages = require("./pages.js");
const cfg = require("./config.js");
const app = express();
const fs = require('fs');
const nodemailer = require('nodemailer');
const db = require("./models");
const port = 3000;

const privateKey = fs.readFileSync('./order.sentebiolab.com.tr/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./order.sentebiolab.com.tr/cert.pem', 'utf8');
const ca = fs.readFileSync('./order.sentebiolab.com.tr/chain.pem', 'utf8');
const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};
//const http = require('http').createServer(function (req, res) {
//    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
//    res.end();
//});


// Create HTTP server using http module
const http = require('http').createServer(app);


//const https = require('https').createServer(app);
//https.addContext("order.sentebiolab.com.tr", credentials);

//const http = require('http').createServer(app);
app.get("/assets/images/logo-white.png", function(req, res, next) {
	res.sendFile("./static/assets/images/logo-white.png", { root: __dirname });
});


app.get("/assets/images/fav.png", function(req, res, next) {
	res.sendFile("./static/assets/images/fav.png", { root: __dirname });
});

app.get("/assets/images/bg1.jpg", function(req, res, next) {
	res.sendFile("./static/assets/images/bg1.jpg", { root: __dirname });
});

app.use(express.static('static'));

app.use(bodyParser.json());

const mail = require("./mail")(nodemailer);
const auth = require("./auth.js")(db);

const controllers = require("./controller");

app.use(
	async function(req, res, next) {
		auth.initialize(req, res, next);
		next();
	}
);

const excelService = require("./excelService");
app.use("/excel", excelService);

const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.post('/upload', function(req, res) {
	console.log("----upload----");
	if (!req.files || Object.keys(req.files).length === 0) {
		res.json({
			ok: false,
			error: "No-file"
		});// return res.status(400).send('No files were uploaded.');
		return
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv('static/files/filename.jpg', function(err) {
		if (err) {
			res.json({
				ok: false,
				error: "saveErr"
			}); //return res.status(500).send(err);
			return;
		}
		res.json({
			ok: true,
			error: "",
			path: "path"
		});
	});
  });

const patchMiddleWare = () => {
  return (req, res, next) => {
		res.setHeader('Content-Type', 'aplication/json');
		res.removeHeader("X-Powered-By");
		req.session = {};
		req.session.userId = req.user.id;
    next();
  }
};

const selectAuthenticate = () => {
  return (req, res, next) => {
		res.setHeader('Content-Type', 'aplication/json');
		res.removeHeader("X-Powered-By");
		req.session = {};
		req.session.userId = req.user.id;
    next();
  }
};

function createRoute(rt, ctrlr) {
	app.post(rt,  auth.authenticate(), patchMiddleWare(),/* db.acl.middleware(),*/ controllers[ctrlr](db));
}

Number.prototype.toStrLen = function(len) {
  const zeroes = "0".repeat(len);
  return zeroes.substring(this.toString().length, len) + this;
}
/*
const excelservice = require("./excelService.js");
app.use("/excel",excelservice);
*/
app.post("/updateTable", auth.authenticate(), async function(req, res) {
	let response = {
		type: req.body.type,
		ok: true,
		services: {}
	};
	if (db == null)
		return;

	let userid = req.user.id

	if (req.body.params.userid != null ) {
		userid = req.body.params.userid;
	}

	db["users"].update(
		req.body.params,
		{
			fields: Object.keys(req.body.params),
			where: {userid: userid}
		}
	).then( () => {
		res.json(response);
	}). catch( () => {
		response.ok = false;
		res.json(response);
	});
});

app.post("/updatePwd", auth.authenticate(), async function(req, res) {
	let response = {
		type: req.body.type,
		ok: true,
		services: {}
	};

	if (db == null)
		return;

	db["acm_users"].update(
		{pwd:req.body.params.newpassword},
		{
			fields: ["pwd"],
			where: {id: req.user.id, pwd:req.body.params.oldpassword}
		}
	).then( () => {
		res.json(response);
	}). catch( () => {
		response.ok = false;
		res.json(response);
	});
});

createRoute("/table", "tableRead");
createRoute("/tableAll", "tableAllRead");
createRoute("/admin/api", "admin");
createRoute("/editor", "editor");

createRoute("/insertPrimer", "primerController");
createRoute("/insertProbe", "probeController");
createRoute("/insertSeq", "seqController");
createRoute("/insertGene", "geneController");

createRoute("/savePrimer","savePrimer");
createRoute("/saveProbe","saveProbe");
createRoute("/saveGene","saveGene");

createRoute("/orderProbe","orderProbe");
createRoute("/orderPrimer","orderPrimer");
createRoute("/orderSeq","orderSeq");
createRoute("/orderGene","orderGene");

createRoute("/synth","synth");
createRoute("/mailer","mailer");
createRoute("/setTracking","setTracking");
createRoute("/deleteOrder","deleteOrder");
createRoute("/editorder","editorder");
createRoute("/extra","extraservice");
createRoute("/repeatoligo","repeatoligo");
createRoute("/pricetable","pricetable");
createRoute("/synthupdate","synthupdate");
createRoute("/synthadd","synthadd");
createRoute("/checksynth","checksynth");

createRoute("/orderUpdate","orderUpdate");

createRoute("/gene","gene");

app.post("/orderSummary", auth.authenticate(), controllers.orderSummary(db));

app.post("/user", auth.authenticate(), async function(req, res) {
	let exists = await db["acm_users"].findAll({
		attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('username')), 'cnt']],
		where: {
			id: req.user.id
		}
	});
	if(exists[0].dataValues.cnt === 0) {
		res.json({
			ok: false,
			reason: "No Such User!"
		});
	} else {
		res.json({
			ok: true,
			id: req.user.id
		});
	}
});

app.post('/register', async function(req, res, next) {
	let exists = await db["acm_users"].findAll({
		attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('username')), 'cnt']],
		where: {
			username: req.body.params.mail
		}
	})	;
	if(exists[0].dataValues.cnt > 0) {
		res.json({
			ok: false,
			error: "E-mail already registered!"
		});
		return;
	}
	let passwd = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789";
	for (let i = 0; i < 8; i++) passwd += possible.charAt(Math.floor(Math.random() * possible.length));
	let user = db["users"].build(req.body.params);
	let saved_user = await user.save();
	let acm_user = db["acm_users"].build({
		username: saved_user.mail,
		pwd: passwd,
		role: 1,
		userid: saved_user.id
	});

	let saved_acm_user = await acm_user.save();

	await user.update({
		userid : saved_acm_user.id
	});

	let resp = await mail.send(saved_acm_user.username,{
			subject: "Sente BioLab'a Hoşgeldiniz",
			text: "Hesap Açılışı",
			html: "<h1 style='color:#555555;'>SenteBiolab Kayıt Bilgilendirme</h1></br> <p>Merhaba Sayın " + saved_user.name
				+ "</p></br><p>Bildiğiniz üzere artık Sentebiolab Biyoteknoloji olarak size hizmet vermekteyiz."
				+ "4 Şubat 2019 tarihinden itibaren Sentegen sipariş sistemi kullanılmayacağı için Sentebiolab sipariş sistemimize müşteri kaydınız yapılmıştır."
				+ "Aşağıdaki linkten size ait kullanıcı ismi ve şifreniz ile siparişlerinizi verebilir ve verdiğiniz siparişlerin durumunu takip edebilirsiniz.</p>"
				+ "<p><a href='order.sentebiolab.com.tr'</a><span>order.sentebiolab.com.tr</span></p>"
				+ "<p>Kullanıcı : " + saved_acm_user.username + "</p>"
				+ "<p>Şifre : " + saved_acm_user.pwd + "</p>"
		});

	res.json({
		ok: true,
		resp: resp
	});
});

app.post("/token", async function(req, res) {
	if (db == null)
		return;
	if (req.body.params.username && req.body.params.password) {
		let exists = await db["acm_users"].findAll({
			include: [
				{
					model: db.acm_roles
				}
			],
			where: {
				username: req.body.params.username,
				pwd: req.body.params.password
			}
		})	;
		if(!exists[0]) {
			res.json({
					ok: false,
					reason: "No Such User!"
				});
		} else {
			const payload = {
				id: exists[0].dataValues.id,
				username: exists[0].dataValues.username,
				role: exists[0].dataValues.acm_role.name,
				mainpage: exists[0].dataValues.acm_role.mainpage
			};
			const token = jwt.encode(payload, cfg.jwtSecret);
			res.json({
				ok : true,
				redir: exists[0].dataValues.acm_role.mainpage,
				token: token
			});
		}
	} else {
		res.json({
			ok: false,
			reason: "Request Parameters Insufficent!"
		});
	}
});

app.post("/page", auth.authenticate(), function (req, res) {
	res.status(200);
	const emptypage = {};
	console.log(req.body.pageid);
	console.log(req.user.role);
	const pagefound = pages[req.body.pageid] && pages[req.body.pageid][req.user.role] ? pages[req.body.pageid][req.user.role] : emptypage;
	if(!pagefound.widgets) pagefound.widgets = {};
	if(!pagefound.services) pagefound.services = {};
	if(!pagefound.functions) pagefound.functions = {};
	const response = {
		ok: true,
		page: pagefound
	};
	res.json(response);
});

app.post("/loginpage", function (req, res) {
	res.status(200);
	const response = {
		ok: true,
		page: pages.login
	};
	res.json(response);
});

app.post("/registerpage", function (req, res) {
	res.status(200);
	const response = {
		ok: true,
		page: pages.register
	};
	res.json(response);
});

app.post("/logout",function (req, res) {
	res.status(200);
	const response = {
		ok: true,
		msg: "tamam hadi siktir git"
	};
	res.json(response);
});

app.all('*', function (req, res) {
   res.status(404);
   res.sendFile(__dirname + '/static/assets/html/404.html');
});

/*app.listen(9090, function() {
    console.log("API is running...");
});*/
http.listen(3000);
//https.listen(443);

module.exports = app;
