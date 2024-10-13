'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schedule', [{
      mon: "10:00,50",
      wed: "10:00,50"
    },{
      mon: "16:00,100",
      wed: "16:00,100",
      thu: "16:00,200"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schedule', null, {});
  }
};
