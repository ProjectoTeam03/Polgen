'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('acm_users', [{
      role: 1,
      username: "test@test.test",
      pwd: "test",
      userid: 1
    }, {
      role: 2,
      username: "uretim@sentebiolab.com.tr",
      pwd: "uretim2018",
      //userid: 2
    }, {
      role: 2,
      username: "hatice@sentebiolab.com.tr",
      pwd: "uretim2018",
      //userid: 3
    }, {
      role: 3,
      username: "info@sentebiolab.com.tr",
      pwd: "sentebiolab2018",
      //userid: 4
    }, {
      role: 3,
      username: "abt@sentebiolab.com.tr",
      pwd: "sentebiolab2018",
      //userid: 5
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('acm_users', null, {});
  }
};
