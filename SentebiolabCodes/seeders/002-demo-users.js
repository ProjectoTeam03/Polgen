'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
	  id: 0,
	  name: "Kontrol-Sentebiolab",
      company: "Kontrol-Sentebiolab",
      department: "Sentez",
	  userid: 0
    }, {
	  id: Sequelize.literal('DEFAULT'),
      name: "Test User",
      mail: "test@test.test",
      company: "Test Company",
      department: "Test Department",
      door: "Test Door",
      address: "Test Teslim Adresi",
      phone: "+0123456789",
      userid: 1
    }/*, {
	  id: Sequelize.literal('DEFAULT'),
      name: "Barış Güvercin",
      mail: "baris.guvercin@acmus.co",
      company: "Acmus",
      department: "R&D",
      door: "1",
      address: "ODTÜ MEMS Tesisleri Mustafa Kemal Mah. Eskişehir Yolu, 06520 Çankaya, Ankara",
      phone: "+0123456789",
      userid: 2
    }, {
	  id: Sequelize.literal('DEFAULT'),
      name: "Afşin Bolat",
      mail: "afsin.bolat@acmus.co",
      company: "Acmus",
      department: "R&D",
      door: "2",
      address: "ODTÜ MEMS Tesisleri Mustafa Kemal Mah. Eskişehir Yolu, 06520 Çankaya, Ankara",
      phone: "+0123456789",
      userid: 3
    }, {
	  id: Sequelize.literal('DEFAULT'),
      name: "Feyzullah Korkmaz",
      mail: "feyzullah.korkmaz@acmus.co",
      company: "Acmus",
      department: "R&D",
      door: "3",
      address: "ODTÜ MEMS Tesisleri Mustafa Kemal Mah. Eskişehir Yolu, 06520 Çankaya, Ankara",
      phone: "+0123456789",
      userid: 4
    }, {
	  id: Sequelize.literal('DEFAULT'),
      name: "Feyzullah Korkmaz",
      mail: "abt@sentebiolab.com.tr",
      company: "Sentab",
      department: "R&D",
      door: "3",
      address: "ODTÜ MEMS Tesisleri Mustafa Kemal Mah. Eskişehir Yolu, 06520 Çankaya, Ankara",
      phone: "+0123456789",
      userid: 4
    }*/], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
