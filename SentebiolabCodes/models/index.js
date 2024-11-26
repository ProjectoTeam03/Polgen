'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Acl = require("acl");
const AclSeq = require("acl-sequelize");
const Op = Sequelize.Op;
const basename = path.basename(__filename);
const config = {
	"production": {
		"username"  : "sentebiolab",
		"password"  : "sentebiolab",
		"database"  : "sentebiolab",
		"host"      : "127.0.0.1",
		"port": 5432,
		"dialect"   : "postgres",
		"pool": {
			"max": 10,
			"min": 5
		}
	},
	"development": {
		"username"  : "sentebiolab",
		"password"  : "sentebiolab",
		"database"  : "sentebiolab",
		"host"      : "127.0.0.1",
		"dialect"   : "postgres",
		"pool": {
			"max": 10,
			"min": 5
		}
	},
	"test": {
		"username"  : "sentebiolab",
		"password"  : "sentebiolab",
		"database"  : "sentebiolab",
		"host"      : "127.0.0.1",
		"port": 5432,
		"dialect"   : "postgres",
		"pool": {
			"max": 10,
			"min": 5
		}
	}
}
const models = path.join(__dirname) // correct it to path where your model files are

const db = {};

config.operatorsAliases = {
	$eq: Op.eq,
	$ne: Op.ne,
	$gte: Op.gte,
	$gt: Op.gt,
	$lte: Op.lte,
	$lt: Op.lt,
	$not: Op.not,
	$in: Op.in,
	$notIn: Op.notIn,
	$is: Op.is,
	$like: Op.like,
	$notLike: Op.notLike,
	$iLike: Op.iLike,
	$notILike: Op.notILike,
	$regexp: Op.regexp,
	$notRegexp: Op.notRegexp,
	$iRegexp: Op.iRegexp,
	$notIRegexp: Op.notIRegexp,
	$between: Op.between,
	$notBetween: Op.notBetween,
	$overlap: Op.overlap,
	$contains: Op.contains,
	$contained: Op.contained,
	$adjacent: Op.adjacent,
	$strictLeft: Op.strictLeft,
	$strictRight: Op.strictRight,
	$noExtendRight: Op.noExtendRight,
	$noExtendLeft: Op.noExtendLeft,
	$and: Op.and,
	$or: Op.or,
	$any: Op.any,
	$all: Op.all,
	$values: Op.values,
	$col: Op.col
};
//NOTE: -------------------------sanirim datayi buradan aliyor  sequelize starting-------------------------
config.logging = console.log;
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("sentebiolab", "sentebiolab", "sentebiolab", {
	host: 'localhost',
	dialect:  'postgres'
});
try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

//NOTE: -------------------------passing the model files to sequelize-------------------------
fs
	.readdirSync(models)
	.filter(function (file) {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
	})
	.forEach(function (file) {
		// Sequelize version <= 5.x
		var model = sequelize['import'](path.join(models, file))
		// Sequelize version >= 6.x
		// var model = require(path.join(models, file))(
		//   sequelize,
		//   Sequelize.DataTypes
		// );
		db[model.name] = model;
	})

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.acm_users.belongsTo(db.acm_roles, {
  foreignKey: 'role'
});
db.acm_permissions.belongsTo(db.acm_roles, {
	foreignKey: 'roleid'
});

db.acl = new Acl(new AclSeq(sequelize,  { prefix: 'acl_' }));
// db2.acl = new Acl(new AclSeq(sequelize2,  { prefix: 'acl_' }));

db.acm_permissions.findAll({
	include: [{model: db.acm_roles
	}]
}).then(function(data) {
	const aclpermissions = data.map(function (perm) {
		return Object.assign(
			{},
			{
				rolename: perm.acm_role.name,
				resource: perm.resource,
				permname: perm.permname
			});
	});
	aclpermissions.forEach(function(e) {
			if(e.rolename && e.resource && e.permname)
				db.acl.allow(e.rolename, e.resource, e.permname);
		});
}).catch(function(err) {
	console.log(err);
});

db.acm_users.findAll({
	include: [
		{
			model: db.acm_roles
		}
	]
}).then(function(data){
	const acluserroles = data.map(function (user) {
		return Object.assign(
			{},
			{
				id: user.id,
				role: user.acm_role.name
			});
	});
	acluserroles.forEach(function(e){
		if(e.id && e.role)
			db.acl.addUserRoles('' + e.id, e.role).then(function(){
				//console.log("user " + e.id + " is added in group " + e.role);
			}).catch(function(){
				//console.log("user " + e.id + " could not be added in group " + e.role);
			});
	});
}).catch(function(err){
	console.log(err);
});

async function getUsers() {

	const usersResult = await db.acm_users.findAll({
		include: [
			{
				model: db.acm_roles
			}
		]
	});
	return usersResult.map(function (user) {
		return Object.assign({},
			{
				id: user.id,
				role: user.acm_role.name,
				username: user.username,
				pwd: user.pwd,
				mainpage: user.acm_role.mainpage
			}
		);
	});
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.userlist = getUsers();

module.exports = db
