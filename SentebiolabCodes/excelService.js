var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mime = require('mime');

var Excel = require('exceljs');

var multer = require('multer')
var upload = multer({ dest: 'files/' })

var bodyParser = require("body-parser");
router.use(bodyParser.json());

const XlsxPopulate = require('xlsx-populate');

//Helper
var columnIndex = function (val) {
  var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

  for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
  }

  return result;
};
var rangeIndex = function (val) {
  var result = {};
  var tmp = val.split(':');
  var start = tmp[0], end = tmp[1];

  var matchCol = start.match(/[A-Z]+/);
  var matchRow = start.match(/\d+/);
  var sc = columnIndex(matchCol[0]);
  var sr = parseInt(matchRow[0]);
  result = { sc: sc, sr: sr };
  if (end) {
    matchCol = end.match(/[A-Z]+/);
    matchRow = end.match(/\d+/);
    var ec = columnIndex(matchCol[0]);
    var er = parseInt(matchRow[0]);
    Object.assign(result, { ec: ec, er: er });
  }
  return result;
}



// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function (req, res) {
  res.send('Excel Service');
});

// Upload file
/*
router.post('/', upload.single('userfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  console.log("FILE ENTRY: ", req.file);
  console.log("TEXT ENTRY: ", req.body);


  var filename = 'blowmeaway.xlsx';
  var filepath = path.join(__dirname, 'tmpfiles/', filename);
  var mimetype = mime.getType(filepath);

  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-Type', mimetype);

  const src = fs.createReadStream(filepath);
  src.pipe(res);
});
*/

router.post('/create', function (req, res) {
  var data = req.body;
  var excel_entries = data.excel_entries;
  var sheets = data['sheets'];


  var options = {
    stream: res,
    useSharedStrings: true,
    useStyles: true
  };
  var wb = new Excel.stream.xlsx.WorkbookWriter(options);

  sheets.forEach(function (sheet_map) {
    var name = sheet_map['name'];
    var ws = wb.addWorksheet(name, { state: 'visible' });

    // Page Setup
    if (sheet_map['pageSetup']) {
      ws.pageSetup = sheet_map['pageSetup'];
    } if (sheet_map['columns']) {
      ws.columns = sheet_map['columns'];
    } if (sheet_map['properties']) {
      for (var key in sheet_map['properties']) {
        ws.properties.key = sheet_map['properties'][key];
      }
    }


    // Apply style to each cell in the targeted ranges
    if (sheet_map['cellStyles']) {
      sheet_map['cellStyles'].forEach(function (cellStyle) {
        cellStyle['target'].forEach(function (range_key) {
          var range = rangeIndex(range_key);
          var sc = range['sc'], sr = range['sr'], ec = range['ec'], er = range['er'];

          if (ec) {
            // TODO: Extend the library for range option
            for (var i = sr; i <= er; i++) {
              for (var j = sc; j <= ec; j++) {
                ws.getCell(i, j).style = cellStyle['style'];
              }
            }
          } else {
            // Single Cell
            ws.getCell(sr, sc).style = cellStyle['style'];
          }
        });
      });
    }

    // Apply validation to each cell in the targeted ranges
    if (sheet_map['validations']) {
      sheet_map['validations'].forEach(function (dataValidation) {
        dataValidation['target'].forEach(function (range_key) {
          var range = rangeIndex(range_key);
          var sc = range['sc'], sr = range['sr'], ec = range['ec'], er = range['er'];

          if (ec) {
            // TODO: Extend the library for range option
            for (var i = sr; i <= er; i++) {
              for (var j = sc; j <= ec; j++) {
                ws.getCell(i, j).dataValidation = dataValidation['validation'];
              }
            }
          } else {
            // Single Cell
            ws.getCell(sr, sc).dataValidation = dataValidation['validation'];
          }
        });
      });
    }

    // Merge the cells in the list
    if (sheet_map['merges'] != undefined) {
      sheet_map['merges'].forEach(function (_merge) {
        ws.mergeCells(_merge);
      });
    }

    // Fill the cell content
    var cells = sheet_map['cells'];
    for (var start_key in cells) {
      var range = rangeIndex(start_key);
      var c = range['sc'], r = range['sr'];

      if (!Array.isArray(cells[start_key]) || !cells[start_key].length) {
        for (var i in cells[start_key]) {
          c = range['sc'];
          if (!Array.isArray(cells[start_key][i]) || !cells[start_key][i].length) {
            for (var j in cells[start_key][i]) {
              if (cells[start_key][i][j] != undefined) {
                ws.getCell(r, c).value = cells[start_key][i][j];
              }
              c++;
            }
          }
          ++r;
        }
      }
    }

    ws.commit();
  });

  wb.commit()
    .then(function () {
      console.log("! FINITO !");
    });
});




// Export Excel file with given data
router.post('/export', function (req, res) {
  var data = req.body;
  var filename = "siparis_template.xlsx";


  if (data.templateid) {
    if (data.templateid == 1) {
      filename = "primer.xlsx";
      //filename = "Sentebiolab-Primer-siparis-formu.xlsx";
    } else if (data.templateid == 2) {
      filename = "probe.xlsx";
    } else if (data.templateid == 3) {
      filename = "production_report_template.xlsx"
    } else if (data.templateid == 4) {
      filename = "siparis_template.xlsx";
    } else if (data.templateid == 5) {
      filename = "sekans.xlsx";
    }
  }

  // GOLDGEN TODO
  /*
    if(req.get("host") == "order.sentebiolab.com.tr") {
		if (data.templateid) {
			if (data.templateid == 1) {
			  filename = "primer.xlsx";
			} else if (data.templateid == 2) {
			  filename = "probe.xlsx";
			} else if (data.templateid == 3) {
			  filename = "production_report_template.xlsx"
			} else if (data.templateid == 4) {
			  filename = "siparis_template.xlsx";
			} else if (data.templateid == 5) {
			  filename = "sekans.xlsx";
			}
		}
	}
	else if(req.get("host") == "order.goldgen.com.tr") {
		if (data.templateid) {
			if (data.templateid == 1) {
			  filename = "primerg.xlsx";
			} else if (data.templateid == 2) {
			  filename = "probeg.xlsx";
			} else if (data.templateid == 3) {
			  filename = "production_report_templateg.xlsx"
			} else if (data.templateid == 4) {
			  filename = "siparis_templateg.xlsx";
			} else if (data.templateid == 5) {
			  filename = "sekansg.xlsx";
			}
		}
	}
	*/
  
  
  
  console.log("Filename : " + filename);

  //var filename = "hebele.xlsx";
  var filepath = path.join(__dirname, 'files/', filename);

  var wb = new Excel.Workbook();
  wb.xlsx.readFile(filepath)
    .then(function () {

      // Image
      // add image to workbook by buffer
      var imageId = wb.addImage({
        buffer: fs.readFileSync(path.join(__dirname, 'files/logo-white.png')),
        extension: 'png',
      });

      // Excel Document Properties
      if (data.creator) wb.creator = data.creator;
      if (data.lastModifiedBy) wb.lastModifiedBy = data.lastModifiedBy;
      if (data.created) wb.created = new Date(data.created);
      if (data.lastPrinted) wb.lastPrinted = new Date(data.lastPrinted);
      wb.modified = new Date();

      var excel_entries = data.excel_entries;
      var sheets = data['sheets'];

      var wsCloned = {};

      sheets.forEach(function (sheet_map) {
        var name = sheet_map['name'];
        var id = sheet_map['id'];
        //
        var ws = wb.getWorksheet(id);
        if (!ws) {
          var ws = wb.addWorksheet(name, { state: 'visible' });
        }

        // TODO worksheet model clone operations
        if (sheet_map['cloned']) wsCloned[id] = ws;
        if (sheet_map['cloneFrom']) ws.model = wsCloned[sheet_map['cloneFrom']].model;

        ws.name = name;
        ws.state = 'visible';

        if (sheet_map['views'])
          ws.views = sheet_map['views'];

        // Page Setup
        if (sheet_map['pageSetup']) {
          ws.pageSetup = sheet_map['pageSetup'];
        } if (sheet_map['state']) {
          ws.state = sheet_map['state'];
        }

        // Add Image
        if (sheet_map['imageRange']) {
          ws.addImage(imageId, sheet_map['imageRange']);
        }

        // Fill the cell content
        var cells = sheet_map['cells'];
        for (var start_key in cells) {
          var range = rangeIndex(start_key);
          var c = range['sc'], r = range['sr'];

          //if (!Array.isArray(cells[start_key]) || !cells[start_key].length) {
          for (var i in cells[start_key]) {
            c = range['sc'];
            //if (!Array.isArray(cells[start_key][i]) || !cells[start_key][i].length) {
            for (var j in cells[start_key][i]) {
              if (cells[start_key][i][j] != undefined) {
                ws.getCell(r, c).value = cells[start_key][i][j];
                // setting excel entries
                if (excel_entries) {
                  if (excel_entries[cells[start_key][i][j]]) {
                    ws.getCell(r, c).value = excel_entries[cells[start_key][i][j]];
                  }
                }
              }
              c++;
            }
            //}
            ws.getRow(r).commit();
            r++;
          }
          //}
        }

        // Apply style to each cell in the targeted ranges
        if (sheet_map['cellStyles']) {
          sheet_map['cellStyles'].forEach(function (cellStyle) {
            cellStyle['target'].forEach(function (range_key) {
              var range = rangeIndex(range_key);
              var sc = range['sc'], sr = range['sr'], ec = range['ec'], er = range['er'];

              if (ec) {
                // TODO: Extend the library for range option
                for (var i = sr; i <= er; i++) {
                  for (var j = sc; j <= ec; j++) {
                    ws.getCell(i, j).style = cellStyle['style'];
                  }
                }
              } else {
                // Single Cell
                ws.getCell(sr, sc).style = cellStyle['style'];
              }
            });
          });
        }

        // Apply validation to each cell in the targeted ranges
        if (sheet_map['validations']) {
          sheet_map['validations'].forEach(function (dataValidation) {
            dataValidation['target'].forEach(function (range_key) {
              var range = rangeIndex(range_key);
              var sc = range['sc'], sr = range['sr'], ec = range['ec'], er = range['er'];

              if (ec) {
                // TODO: Extend the library for range option
                for (var i = sr; i <= er; i++) {
                  for (var j = sc; j <= ec; j++) {
                    ws.getCell(i, j).dataValidation = dataValidation['validation'];
                  }
                }
              } else {
                // Single Cell
                ws.getCell(sr, sc).dataValidation = dataValidation['validation'];
              }
            });
          });
        }


        if (cells) {
          [].map(function (k) {
            //console.log(ws.getCell(k).value);
          });
        }
        var row = ws.getRow(10);
        row.eachCell(function (cell, colNumber) {
          //console.log('Cell ' + colNumber + ' = ' + cell.value);
        });

        // Merge the cells in the list
        if (sheet_map['merges'] != undefined) {
          sheet_map['merges'].forEach(function (_merge) {
            ws.mergeCells(_merge);
          });
        }
      });

	  sheets.forEach(function (sheet_map) {
	    if (sheet_map["remove"]) {
			var remid = sheet_map['id'];
			wb.removeWorksheet(Number(remid));
	    }
	  });

      // Write 
      wb.xlsx.write(res);

    });
});

router.post('/exportwb', function (req, res) {

  var data = req.body;
  var filename = "siparis_template.xlsx";

  if (data.templateid) {
    if (data.templateid == 1) {
      //filename = "primer.xlsx";
      filename = "Sentebiolab-Primer-siparis-formu.xlsx";
    } else if (data.templateid == 2) {
      filename = "Sentebiolab-Prob-siparis-formu.xlsx";
    } else if (data.templateid == 3) {
      filename = "production_report_template.xlsx"
    } else if (data.templateid == 4) {
      filename = "siparis_template.xlsx";
    } else if (data.templateid == 5) {
      filename = "Sentebiolab-Sekans-siparis-formu.xlsx";
    }
  }

  var filepath = path.join(__dirname, 'files/', filename);

  console.log(data);

    XlsxPopulate.fromFileAsync(filepath)
    .then(workbook => {
      
      var oligos = data.rows;
      var excel_entries = data.excel_entries;
      if (data.templateid == 1) {
        var rowstart = 21;
        for (var i in oligos) {
          workbook.sheet(1).cell("A" + (rowstart)).value(oligos[i][0]);
          workbook.sheet(1).cell("B" + (rowstart)).value(oligos[i][1]);
          workbook.sheet(1).cell("C" + (rowstart)).value(oligos[i][2]);
          workbook.sheet(1).cell("D" + (rowstart)).value(oligos[i][3]);
          workbook.sheet(1).cell("F" + (rowstart)).value(Number(oligos[i][5]));
          workbook.sheet(1).cell("G" + (rowstart)).value(oligos[i][6]);
          rowstart += 1;
        }
      } else if (data.templateid == 2) {
        var rowstart = 21;
        for (var i in oligos) {
          workbook.sheet(1).cell("A" + (rowstart)).value(oligos[i][0]);
          workbook.sheet(1).cell("B" + (rowstart)).value(oligos[i][1]);
          workbook.sheet(1).cell("C" + (rowstart)).value(oligos[i][2]);
          workbook.sheet(1).cell("D" + (rowstart)).value(oligos[i][3]);
          rowstart += 1;
        }
      } else if (data.templateid == 5) {
        var rowstart = 21;
        for (var i in oligos) {
          workbook.sheet(1).cell("A" + (rowstart)).value(oligos[i][0]);
          workbook.sheet(1).cell("B" + (rowstart)).value(Number(oligos[i][1]));
          workbook.sheet(1).cell("C" + (rowstart)).value(oligos[i][2]);
          workbook.sheet(1).cell("D" + (rowstart)).value(Number(oligos[i][3]));
          workbook.sheet(1).cell("E" + (rowstart)).value(oligos[i][4]);
          workbook.sheet(1).cell("F" + (rowstart)).value(Number(oligos[i][5]));
          workbook.sheet(1).cell("G" + (rowstart)).value(oligos[i][6]);
          rowstart += 1;
        }
      }

      if(excel_entries['<date>'] != null) workbook.sheet(1).cell("B10").value(excel_entries['<date>']);
      if(excel_entries['<name>'] != null) workbook.sheet(1).cell("B11").value(excel_entries['<name>']);
      if(excel_entries['<curator>'] != null) workbook.sheet(1).cell("B12").value(excel_entries['<curator>']);
      if(excel_entries['<corporation>'] != null) workbook.sheet(1).cell("B13").value(excel_entries['<corporation>']);
      if(excel_entries['<division>'] != null) workbook.sheet(1).cell("B14").value(excel_entries['<division>']);
      if(excel_entries['<room>'] != null) workbook.sheet(1).cell("B15").value(excel_entries['<room>']);
      if(excel_entries['<address>'] != null) workbook.sheet(1).cell("B16").value(excel_entries['<address>']);
      if(excel_entries['<phone>'] != null) workbook.sheet(1).cell("B18").value(excel_entries['<phone>']);
      if(excel_entries['<email>'] != null) workbook.sheet(1).cell("B19").value(excel_entries['<email>']);

      if(excel_entries['<order_no>']!= null) workbook.sheet(1).cell("F10").value(excel_entries['<order_no>']);
      if(excel_entries['<vergi_dairesi ve no>'] != null) workbook.sheet(1).cell("F12").value(excel_entries['<vergi_dairesi ve no>']);
      if(excel_entries['<billing_address>'] != null) workbook.sheet(1).cell("F14").value(excel_entries['<billing_address>']);
      if(excel_entries['<project_no>'] != null) workbook.sheet(1).cell("F16").value(excel_entries['<project_no>']);

      return workbook.outputAsync();
    })
    .then(respdata => {
        res.send(respdata);
    });

});

module.exports = router