'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('billingaddress', [{
      taxoffice: "Test Office",
      taxnumber: "0123456789",
      address: "Test address",
      project: "Test project",
      natid: "0123456789",
      phone: "+01234567890",
      mail: "Test mail",
      userid: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('billingaddress', null, {});
  }
};
