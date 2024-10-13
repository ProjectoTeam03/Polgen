/*
Options:
fileupload: activate file upload event handler and register "change" event to widget
map: 
  Array of worksheet mapping properties
  'dtTitleRow': 2D dynamic data titles
  'dtStartRow': 2D dynamic data starting row index
  'dtStartCol': 2D dynamic data starting column index
*/
; (function ($) {
    $.widget("acm.xlsx", {
      options: {
        fileupload: false,
        filename: "test",
        uploadfunc : function(val){console.log(val);},
      },
  
      _create: function () {
  
        if (this.options.fileupload) {
          this._on(this.element, {
            "change": "_fileupload"
          });
        }
      },
  
      set: function (data) {
        console.log("do something awesome with received data...");
        console.log(data);
      },
  
      get: function () {
        return "some value";
      },
  
      uploadfunc: function (func) {
          this.options.uploadfunc = func;
      },
      
      _fileupload: function (e) {
        if ($(this.element)[0].files[0] === undefined) return;
        var self = this;
        var file = $(this.element)[0].files[0];
        var reader = new FileReader();
        var map = this.options.map;
  
        reader.onloadend = function (e) {
          var data = new Uint8Array(reader.result);
          var workbook = XLSX.read(data, {
            type: 'array'
          });
          
          $.each(map, function (indx, sheet_map) {
            
            var first_sheet_name = workbook.SheetNames[indx];
            var worksheet = workbook.Sheets[first_sheet_name];
  
            if(worksheet == null) return;

            // If any data is present in the sheet read the data
            if (sheet_map['dtTitleRow']) {
              var dtColLen = sheet_map['dtTitleRow'].length;
              var s_row = XLSX.utils.decode_cell(sheet_map['dtOrigin']).r;
              var s_col = XLSX.utils.decode_cell(sheet_map['dtOrigin']).c;
              var range = XLSX.utils.decode_range(worksheet['!ref']);
              var e_row = range.e.r;
              var tmp_arr, dt_data = [], dt_titles = [];
  
  
              for (var i = s_row; i <= e_row; i++) {
                tmp_arr = [];
                for (var j = s_col; j < dtColLen; j++) {
                  var nextCell = worksheet[XLSX.utils.encode_cell({ r: i, c: j })];
  
                  if (typeof nextCell === 'undefined') {
                    tmp_arr.push(void 0);
                  } else {
                    tmp_arr.push(nextCell.v);
                  }
                }
                dt_data.push(tmp_arr);
              }
              /*
              $.each(sheet_map['dtTitleRow'], function (key, val) {
                dt_titles.push(worksheet[val].v);
              });*/
              //console.log(dt_data); user dt_data here
              self.options.uploadfunc(dt_data);			
            }
          });		
        };
  
        reader.onerror = function (ex) {console.log(ex);};
        reader.readAsArrayBuffer(file);
        self.element.val("");
      },
  
      insert: function (data, file) {
        /////////////////////////////////////
        var file = $(this.element)[0].files[0];
        /////////////////////////////////////
  
  
        var self = this;
        var reader = new FileReader();
        var excel_entries = data.excel_entries;
        var table_data = data.table_data;
  
        // Reader reads the file
        reader.onloadend = function (e) {
          var template = new Uint8Array(reader.result);
          var wb = XLSX.read(template, { type: 'array' });
  
          var map = self.options.map;
          // Alter each sheet 
          $.each(map, function (indx, sheet_map) {
  
            var sheet_name = sheet_map.name;
            var ws = wb.Sheets[sheet_name];
  
            var cells = sheet_map.cells;
            $.each(cells, function (address, cell_data) {
              // Change the data placeholders with the actual data
              for (var _r in cell_data) {
                for (var __r in cell_data[_r]) {
                  for (var __id in excel_entries) {
                    var __regex = new RegExp(__id);
                    cell_data[_r][__r] = cell_data[_r][__r].replace(__regex, excel_entries[__id]);
                  }
                }
              }
  
              // Add data to the worksheet
              XLSX.utils.sheet_add_aoa(ws, cell_data, { origin: address });
            });
  
            // Add table data to worksheet
            var table_rows = table_data[indx];
            var table_array = [];
            if (table_rows.length > 0) {
              for (var _r in table_rows) {
                table_array.push(
                  $.map(table_rows[_r], function (__r) {
                    return __r;
                  })
                );
              }
            }
            XLSX.utils.sheet_add_aoa(ws, table_array, { origin: sheet_map.dtOrigin });
          });
  
  
          var wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
          var wbout = XLSX.write(wb, wopts);
  
          /* the saveAs call downloads a file on the local machine */
          saveAs(new Blob([wbout], { type: "application/octet-stream" }), self.options.filename + ".xlsx");
        };
  
        reader.readAsArrayBuffer(file);
      },
  
  
      export: function (data) {
        var wb = XLSX.utils.book_new();
        var excel_entries = data.excel_entries;
        var table_data = data.table_data;
  
        var map = this.options.map;
        // Create each sheet 
        $.each(map, function (indx, sheet_map) {
          var ws_name = sheet_map.name;
          var ws = XLSX.utils.aoa_to_sheet([[]]); // Start with blank worksheet
  
          ws['!cols'] = sheet_map.colStyles;
          ws['!rows'] = sheet_map.rowStyles;
  
          if (!ws['!merges']) { ws['!merges'] = []; }
  
          for (var m in sheet_map.merges) {
            var merge = XLSX.utils.decode_range(sheet_map.merges[m]);
            ws['!merges'].push(merge);
          }
  
          // Add cell entries
          $.each(sheet_map.cells, function (address, cell_data) {
            // Change the data placeholders with the actual data
            for (var _r in cell_data) {
              for (var __r in cell_data[_r]) {
                for (var __id in excel_entries) {
                  var __regex = new RegExp(__id);
                  cell_data[_r][__r] = cell_data[_r][__r].replace(__regex, excel_entries[__id]);
                }
              }
            }
  
            // Add data to the worksheet
            XLSX.utils.sheet_add_aoa(ws, cell_data, { origin: address });
          });
  
  
          // Add table data to worksheet
          var table_rows = table_data[indx];
          var table_array = [];
          if (table_rows.length > 0) {
            for (var _r in table_rows) {
              table_array.push(
                $.map(table_rows[_r], function (__r) {
                  return __r;
                })
              );
            }
          }
          XLSX.utils.sheet_add_aoa(ws, table_array, { origin: sheet_map.dtOrigin });
  
  
          /* Add the worksheet to the workbook */
          XLSX.utils.book_append_sheet(wb, ws, ws_name);
        });
  
        var wopts = { bookType: 'xlsx', bookSST: false, type: 'array' };
        var wbout = XLSX.write(wb, wopts);
  
        /* the saveAs call downloads a file on the local machine */
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), this.options.filename + ".xlsx");
      }
  
    });
  }(jQuery));
  