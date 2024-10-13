module.exports.baris = (sdb,gdb) => {
	
	return async function (req, res, next) {

	var db = null;
	if(req.get("host") == "order.sentebiolab.com.tr") {
		db = sdb;
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		db = gdb;
	}
	if (db == null) return;
	
	res.status(200);

  console.log("POST request /production/api : \n", req.body);

  var serviceresponses = {};
  Object.keys(req.body.services).forEach(function (k) {
    var servicerequest = req.body.services[k];


    if (servicerequest.datatype == "datatable") {

      if (servicerequest.datatable == "orderlisttable") {
        console.log("HELLO: ", servicerequest);
        serviceresponses[k] = [
          {
            id: 1,
            customer: "Mahmut Lab",
            order_no: "00034",
            order_date: 1543218214572,
            scale: 5,
            order_type: "",
            details: "",
            completion: 35,
            approval: 0
          },
          {
            id: 2,
            customer: "Mahmut Lab",
            order_no: "00033",
            order_date: 1543218214572,
            scale: 12,
            order_type: "",
            details: "",
            completion: 80,
            approval: 1
          },
          {
            id: 3,
            customer: "Mahmut Lab",
            order_no: "00034",
            order_date: 1543218214572,
            scale: 5,
            order_type: "",
            details: "",
            completion: 35,
            approval: 0
          },
          {
            id: 4,
            customer: "Mahmut Lab",
            order_no: "00033",
            order_date: 1543218214572,
            scale: 12,
            order_type: "",
            details: "",
            completion: 80,
            approval: 1
          }
        ];
      } if (servicerequest.datatable == "oldsynthesestable") {
        serviceresponses[k] = [
          {
            id: 1,
            synth_group: "181024-1",
            synth_date: 1543218214572,
            product_name: "KD_347"
          },
          {
            id: 2,
            synth_group: "181024-2",
            synth_date: 1543218214572,
            product_name: "KD_347"
          },
          {
            id: 3,
            synth_group: "181025-1",
            synth_date: 1543218214572,
            product_name: "KD_347"
          },
          {
            id: 4,
            synth_group: "181025-2",
            synth_date: 1543218214572,
            product_name: "KD_347"
          }
        ];
      }

      if (servicerequest.datatable == "customertable") {
        serviceresponses[k] = [
          {
            id: 1,
            product_type: "primer",
            order_date: 1543218214572,
            status: "Kargo Teslim",
            address: "Mahmutpaşa Mahallesi 229. Sokak Çalışan Gençlik İşhanı Zemin Kat No:3 İstanbul",
            email: "mahmut@mahmutkan.com.tr",
            tracking_no: "2100012002",
            amount: "35"
          }
        ];
      }
      if (servicerequest.datatable == "orderinfotable") {
        serviceresponses[k] = [
          {
            id: 1,
            base_pair: "312312",
            total_products: "22",
            dslt: "333",
            opc: "32",
            hplc: "1"
          }
        ];
      } if (servicerequest.datatable == "orderdetailstable") {
        serviceresponses[k] = [
          {
            id: 1,
            oligonucleotid: "181025-1-20",
            product_name: "KD_347",
            five_mod: 1,
            sequence: "CGTAAAGCTAGATCGCTAGAGCTAGATCGAT",
            three_mod: 3,
            bp: 20,
            scale: 50,
            purification: 1,
            status: 1,
            price: 3
          },
          {
            id: 2,
            oligonucleotid: "181025-1-20",
            product_name: "KD_347",
            five_mod: 1,
            sequence: "CGTAAAGCTAGATCGCTAGAGCTAGATCGAT",
            three_mod: 3,
            bp: 20,
            scale: 50,
            purification: 1,
            status: 1,
            price: 3
          },
          {
            id: 3,
            oligonucleotid: "181025-1-20",
            product_name: "KD_347",
            five_mod: 1,
            sequence: "CGTAAAGCTAGATCGCTAGAGCTAGATCGAT",
            three_mod: 3,
            bp: 20,
            scale: 50,
            purification: 1,
            status: 1,
            price: 3
          },
          {
            id: 4,
            oligonucleotid: "181025-1-20",
            product_name: "KD_347",
            five_mod: 1,
            sequence: "CGTAAAGCTAGATCGCTAGAGCTAGATCGAT",
            three_mod: 3,
            bp: 20,
            scale: 50,
            purification: 1,
            status: 1,
            price: 3
          }
        ];
      } if (servicerequest.datatable == "primerpooltable") {
        serviceresponses[k] = [
          {
            id: 1,
            order_date: 1543218214572,
            order_no: "181022-01-10",
            customer_name: "Mahmut Lab",
            five_mod: 1,
            oligo_name: "181025-1-20",
            three_mod: 3,
            bp: 20,
            purification: 1,
            scale: 50
          },
          {
            id: 2,
            order_date: 1543218214572,
            order_no: "181022-02-13",
            customer_name: "Yıldızlar Sağlıkçılık",
            five_mod: 1,
            oligo_name: "181025-1-20",
            three_mod: 3,
            bp: 20,
            purification: 1,
            scale: 50
          },
          {
            id: 3,
            order_date: 1543218214572,
            order_no: "181022-02-14",
            customer_name: "Yıldızlar Sağlıkçılık",
            five_mod: 1,
            oligo_name: "181025-1-20",
            three_mod: 3,
            bp: 20,
            purification: 1,
            scale: 50
          },
          {
            id: 4,
            order_date: 1503218214572,
            order_no: "181022-02-15",
            customer_name: "Yıldızlar Sağlıkçılık",
            five_mod: 1,
            oligo_name: "181025-1-20",
            three_mod: 3,
            bp: 20,
            purification: 1,
            scale: 50
          }
        ];
      } if (servicerequest.datatable == "reporttable") {
        serviceresponses[k] = [
          {
            id: 1,
            "inozine": "asdasdasd",
            "synth_no": "123",
            "scale": "123",
            "purification": "321",
            "company_name": "32",
            "oligo_name": "123",
            "dmt": "123",
            "a260": "32",
            "tm_basic": "123",
            "mw": "321",
            "conc": "321",
            "total_ng": "1132",
            "od": "321",
            "total_nmol": "123123123"
          },
          {
            id: 2,
            "inozine": "qwerqwe",
            "synth_no": "321",
            "scale": "321",
            "purification": "321",
            "company_name": "32",
            "oligo_name": "123",
            "dmt": "123",
            "a260": "44",
            "tm_basic": "123",
            "mw": "321",
            "conc": "321",
            "total_ng": "1132",
            "od": "321",
            "total_nmol": "123123123"
          },
          {
            id: 3,
            "inozine": "qwety",
            "synth_no": "2222",
            "scale": "222",
            "purification": "321",
            "company_name": "32",
            "oligo_name": "123",
            "dmt": "123",
            "a260": "55",
            "tm_basic": "123",
            "mw": "321",
            "conc": "321",
            "total_ng": "1132",
            "od": "321",
            "total_nmol": "123123123"
          }
        ];
      }
    }
  });


  var response = {
    type: req.body.type,
    ok: true,
    services: serviceresponses
  };

  console.log(req.body);
  console.log(response);

  res.json(response);
  };
};