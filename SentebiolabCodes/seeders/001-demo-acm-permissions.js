'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('acm_permissions', [{
      roleid: 1,
      resource: "/insertPrimer",
      permname: "post"
    }, {
      roleid: 1,
      resource: "/tableAll",
      permname: "post"
    }, {
      roleid: 1,
      resource: "/table",
      permname: "post"
    }, {
      roleid: 2,
      resource: "/production/api",
      permname: "post"
    }, {
      roleid: 2,
      resource: "/mailer",
      permname: "post"
    }, {
      roleid: 2,
      resource: "/deleteOrder",
      permname: "post"
    }, {
      roleid: 2,
      resource: "/editorder",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/admin/api",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/production/api",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/tableAll",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/table",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/testdb",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/editor",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/insertPrimer",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/insertProbe",
      permname: "post"
    }, {
      roleid: 3,
      resource: "/mailer",
      permname: "post"
    },{
      roleid: 3,
      resource: "/setTracking",
      permname: "post"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('acm_permissions', null, {});
  }
};
