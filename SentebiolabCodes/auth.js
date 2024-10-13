const passportJWT = require("passport-jwt");
const cfg = require("./config.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

const Passport = require('passport').Passport;
passport = new Passport();

module.exports = function(db) {
    let strategy = new Strategy(params, async function(payload, done) {
		let exists = await db["acm_users"].findAll({
			include: [{
				model: db.acm_roles
			}],
			where: {
				id: payload.id
			}
		});
		if(!exists[0]) {
			return done(null, {
				id: 0
			});
		} else {
			return done(null, {
				id: exists[0].dataValues.id,
				role: exists[0].dataValues.acm_role.name
			});
		}
    });
    passport.use(strategy);
    return {
        initialize: function(req, res, next) {
			return passport.initialize();
        },
        authenticate: function() {
            return function(req,res,next) {
				passport.authenticate('jwt', cfg.jwtSession)(req,res,next);
			}
        }
    };
};
