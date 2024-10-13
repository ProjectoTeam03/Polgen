module.exports.admin = (db) => {
  return async function (req, res) {
    if (db == null)
      return;


    let serviceresponses = {};

    Object.keys(req.body.services).forEach(function (k) {
      const servicerequest = req.body.services[k];
      if ("datatype" in servicerequest && servicerequest.datatype === "datatable") {
        if (servicerequest.datatable === "customertable") {
          serviceresponses[k] = [{
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
        else if (servicerequest.datatable === "orderinfotable") {
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
      } else if (servicerequest.datatable === "orderlisttable") {


      }
        else if (servicerequest.datatable === "orderdetailstable") {
        serviceresponses[k] = [
          {
            id: 1,
            oligonucleotid: "180709-2-31",
            product_name: "26.12.2018",
            five_mod: 5,
            sequence: "CGTAACGTTTCGAGAGAGAGTTGAA",
            three_mod: 0,
            bp: 0,
            scale: 0,
            purification: "",
            status: "",
            price: 100
          },
          {
            id: 2,
            oligonucleotid: "180709-2-31",
            product_name: "26.12.2018",
            five_mod: 5,
            sequence: "CGTAACGTTTCGAGAGAGAGTTGAA",
            three_mod: 0,
            bp: 0,
            scale: 0,
            purification: "",
            status: "",
            price: 100
          },
          {
            id: 3,
            oligonucleotid: "180709-2-31",
            product_name: "26.12.2018",
            five_mod: 5,
            sequence: "CGTAACGTTTCGAGCGTAACGTTTCGAGTTCGAAGTGCCGTAACGTTTCGAGCGTAACGTTTCGAGTTCGAAGTGCCGTAACGTTTCGAGCGTAACGTTTCGAGTTCGAAGTGCCGTAACGTTTCGAGCGTAACGTTTCGAGTTCGAAGTGC",
            three_mod: 0,
            bp: 0,
            scale: 0,
            purification: "",
            status: "",
            price: 100
          },
          {
            id: 4,
            oligonucleotid: "180709-2-31",
            product_name: "26.12.2018",
            five_mod: 5,
            sequence: "CGTAACGTTTCGAGAGAGAGTTGAA",
            three_mod: 0,
            bp: 0,
            scale: 0,
            purification: "",
            status: "",
            price: 100
          },
          {
            id: 5,
            oligonucleotid: "180709-2-31",
            product_name: "26.12.2018",
            five_mod: 5,
            sequence: "CGTAACGTTTCGAGAGAGAGTTGAA",
            three_mod: 0,
            bp: 0,
            scale: 0,
            purification: "",
            status: "",
            price: 100
          }
        ];
      }
      }


  });
    let response = {
      type: req.body.type,
      ok: true,
      services: serviceresponses
    };
    
    res.status(200);
    res.json(response);
  };
};
