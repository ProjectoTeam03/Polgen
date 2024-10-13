'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('acm_roles', [{
      name: "order",
      mainpage: "dashboard.html"
    }, {
      name: "production",
      mainpage: "productionOrderList.html"
    }, {
      name: "admin",
      mainpage: "delivery.html"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('acm_roles', null, {});
  }
};
