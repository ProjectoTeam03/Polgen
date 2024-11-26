module.exports = function(nm) {
	let transporter = nm.createTransport({
			debug: true,
			host: "mail.sentebiolab.com.tr",//'mail.sentebiolab.com.tr', //smtp.domain.com
			port: 465,//465, //993-465 ,587, 25
			secure: true,//true, // true for 465, false for other ports
			tls: {
				rejectUnauthorized: false
			},
			auth: {
				user: "info@sentebiolab.com.tr",//"info@sentebiolab.com.tr", //acmus@acmus.co
				pass: "BMye05T5"//"SEntebiolab13579"  //4f$!nBugr4
			}
			
	});
	return {

      //NOTE:------------------ sening mail after registerion takes 2 params------------------
		send: function(rcv, msg) {
			return new Promise( function(resolve, reject) {
				// setup email data with unicode symbols
				let mailOptions = {
						from: '"Sentebiolab E-Posta Hizmetleri" <info@sentebiolab.com.tr>', // sender address
						to: rcv, // list of receivers
				};
				if(msg.from) mailOptions.from = msg.from;
      // NOTE:------------------we have the from option what about to --------- later noticed that no need-------------
				if(msg.subject) mailOptions.subject = msg.subject;
				if(msg.text) mailOptions.text = msg.text;
				if(msg.html) mailOptions.html = msg.html;
				return transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log(error);
						reject(error);
					} else {
						//console.log('Message sent: %s', info.messageId);
						resolve(info.messageId);
					}
				});
			});
		}
	};
};
