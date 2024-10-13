; (function ($) {
	$.widget("acm.table", {
		options: {
			
			onset : null
			
		},
		table: null,
		editor: null,
		datatable: null,
		_create: function () {
			var self = this;
			this.table = $(document.createElement("table")).attr("id", this.options.id + "_table").appendTo(this.element)
			.on("draw.dt",function () { 
				self.table.find(".progress").progress()
			});
			if (this.options["table"]) this.table.addClass(this.options["table"]);
			if (this.options.datatable.responsive) this.table.css("width", "100%");
			$.each(this.options.datatable.columns, function (i, v) {
				if (v.render && $.type(v.render) == "string" && $.getFunction(v.render)) {
					v.render = $.getFunction(v.render);
				}
			});
			if(this.options.fetchparams && this.options.fetchparams.columns == "dt") {
				this.options.fetchparams.columns = [];
				$.each(this.options.datatable.columns, function(i, v) {
					if(v.name) self.options.fetchparams.columns.push(v.name);
					if(!v.visible && v.data) self.options.fetchparams.columns.push(v.data);
				});
			}
			if(this.options.editor) this.setEditor(this.options.editor);
			if(this.options.datatable.buttons) {
				$.each(this.options.datatable.buttons, function(i, v) {
					if(v.editor) v.editor = self.editor;
				});
			}
			if(this.options.datatable.rowCallback) {
				this.options.datatable.rowCallback = $.getFunction(this.options.datatable.rowCallback);
			}
			if(this.options.datatable.footerCallback) {
				this.options.datatable.footerCallback = $.getFunction(this.options.datatable.footerCallback);
			}
			this.datatable = this.table.DataTable(this.options.datatable); //jquery.DataTable
			this.table.data("widget", this);
		},
		
		getRowByDataId: function(id) {
			var theRow, editorIdSrc = this.options.editor.idSrc;
			this.table.DataTable().rows().every( function ( rowIdx, tableLoop, rowLoop ) {
				if(this.data()[editorIdSrc] == id) {
					theRow = this;
					return false;
				}
			});
			return theRow;
		},

		clear: function () {
			this.table.DataTable().clear();
		},
		// Array of each row (JSON objects)
		get: function () {
			return this.table.DataTable().rows().data().toArray();
		},

		set: function (data) {

			if($.type(data) == "array") {
				this.table.DataTable().clear();
				this.addData(data);
				this.table.DataTable().columns.adjust()
			} else if($.type(data) == "object") {
				if(data.options) {
					var self = this;
					$.each(data.options, function(k,v) {
						if(self.editor.field(k).s.opts.defOption) {
							var tdefOption = self.editor.field(k).s.opts.defOption
							if(tdefOption.pos != null && $.type(tdefOption.pos) == "number") {
								v = self.insert(v,tdefOption,tdefOption.pos);
							}
							else v.push(tdefOption);
						}
						self.editor.field(k).update(v);
					});
				}
				if(!data.action) {
					if(this.options.datatable.dataCallback) {
						$.getFunction(this.options.datatable.dataCallback)(data.data);
					}
					this.table.DataTable().clear();
					this.addData(data.data);
				} else if(data.action == "edit") {
					var self = this;
					$.each(data.data, function(i,v){
						var rowId = v[self.options.editor.idSrc];
						var theRow = self.getRowByDataId(rowId);
						if(theRow) {
							theRow.data(v).draw();
						} else {
							console.log(rowId + " could not be found");
						}
					});

				} else if (data.action == "create") {
					var self = this, theRow, editorIdSrc = this.options.editor.idSrc;
					this.datatable.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
						if(this.data() && this.data()[editorIdSrc] == "") {
							this.remove().draw();
						}
					});
					console.log(data.data);
					this.addData(data.data);

				} else if(data.action == "remove") {
					/*
					var editorIdSrc = this.options.editor.idSrc;
					var self = this;
					$.each(data.data, function(i,v){
						self.table.DataTable().rows().every( function ( rowIdx, tableLoop, rowLoop ) {
							if(this.data()[editorIdSrc] == v) {
								console.log(this.remove);
								this.remove();
							}
						});
					});
					*/
				}
			} else {
				console.log("WTF did you just send bro?");
				console.log(data);
			}
			
			if(this.options.onset != null) {
				this.options.onset(this);
			}
			
		},

		addData: function (data) {
			this.table.DataTable().rows.add(data).draw();
			if (this.options.hideempty) {
				var emptyCount = 0;
				var tbl = this.table.DataTable();
				tbl.columns().every(function () {
					var data = this.data();
					for (var i = 0; i < data.toArray().length; i++)
						if (data.toArray()[i] === null || data.toArray()[i].length === 0) emptyCount++;
					if (emptyCount === data.toArray().length) tbl.column(this.index()).visible(false);
					emptyCount = 0;
				});
			}
		},
		
		/*
		*	col_selector : [, { name: <column_name>, render: <boolean> }]
		*	name: datatable columns.name
		*	render: raw data or rendered data as in UI
		*	return: 
		*/
		getCols: function (col_selector) {
			var rows = this.table.DataTable().rows().data().toArray();
			var filtered = [];

			for (var i in rows) {
				var elm = {};
				for (var j in col_selector) {
					var column_name = col_selector[j]['name'];
					if (col_selector[j]['render']) {
						elm[column_name] = this.table.DataTable().cells(i, column_name + ":name").render('display')[0];
					} else {
						elm[column_name] = this.table.DataTable().cells(i, column_name + ":name").data()[0];
					}
					if( ! elm[column_name] ) elm[column_name] = '';		// Add empty string instead of undefined
				}
				filtered.push(elm);
			}
			//console.log(filtered);
			return filtered;
		},
		getColsAOA: function (col_selector) {
			var table_rows = this.getCols(col_selector);
			var table_array = [];
			if (table_rows.length > 0) {
				for (var _r in table_rows) {
					table_array.push(
						$.map(table_rows[_r], function (__r) {
							//if (__r == null) return ""; 
							return __r;
						})
					);
				}
			}
			return table_array;
		},

		search: function (column_name, input) {
			this.table.DataTable().columns(column_name + ":name").search(input).draw();
		},

		setEditor: function (opts) {
			var self = this, cols = [];
			if(opts.allowed) { //allowed columns list
				$.each(this.options.datatable.columns, function(i, v) {
					if(v.data == undefined) {
						v.className = "noneditable";
					} else if(opts.allowed.find(function(item){ return item == v.data})) {
						var newCol = {name:v.data, label:v.title};
						if(v.name) newCol.name = v.name;
						if(v.type) newCol.type = v.type;
						if(v.options) newCol.options = v.options;
						if(v.placeholder) newCol.placeholder = v.placeholder;
						if(v.def) newCol.def = v.def;
						if(v.defaultContent) newCol.defaultContent = v.defaultContent;
						if(v.defOption) newCol.defOption = v.defOption;
						cols.push(newCol);
					} else {
						v.className = "noneditable";
					}
				});
			} else if(opts.denied) { //denied column list
				$.each(this.options.datatable.columns, function(i, v) {
					if(v.data == undefined) {
						v.className = "noneditable";
					} else if(!opts.denied.find(function(item){ return item == v.data})) {
						var newCol = {name:v.data, label:v.title};
						if(v.name) newCol.name = v.name;
						if(v.type) newCol.type = v.type;
						if(v.options) newCol.options = v.options;
						if(v.placeholder) newCol.placeholder = v.placeholder;
						cols.push(newCol);
					} else {
						v.className = "noneditable";
					}
				});
			} else { // if allowed or denied are not provided
				$.each(this.options.datatable.columns, function(i, v) {
					var newCol = {name:v.data, label:v.title};
					if(v.name) newCol.name = v.name;
					if(v.type) newCol.type = v.type;
					if(v.options) newCol.options = v.options;
					if(v.placeholder) newCol.placeholder = v.placeholder;
					cols.push(newCol);
				});
			}
			self.editor = new $.fn.dataTable.Editor({
				table: "#" + self.table.attr("id"),
				fields: cols,
				idSrc: opts.idSrc
			});
			if (opts.bubble) {
				self.table.on('click', 'tbody td:not(.noneditable)', function () {
					self.editor.bubble(this, opts.bubbleFields, opts.bubble);
				});
			}
			if (opts.inline) {
				self.table.on('click', 'tbody td:not(.noneditable)', function () {
					self.editor.inline(this, opts.inlineFields, opts.inline);
				});
			}
			self.editor.on("preSubmit", function (e, data, action) {
				//console.log(data.data);
				if(opts.presubmit) {
					$.each(data.data,function(i,v) {
						v = $.extend(v,self.options.editor.presubmit);
					})
				}
				//console.log(data);
				if(opts.localeditor) {
					//console.log("presubmit local")
				} else {
					var fetchparams = {};
					fetchparams.action = data.action;
					fetchparams.fields = [];
					$.each(data.data, function(i,v){
						var rowparams = {};
						rowparams.fields = {};
						$.each(v, function(k,vv){
							if(k == opts.idSrc) {
								rowparams.where = {};
								rowparams.where[k] = vv;
							} else {
								rowparams.fields[k] = vv;
							}
						});
						fetchparams.fields.push(rowparams);
					});
					self.fetch(fetchparams);
					return true;
				}
			});
			self.editor.on("postEdit", function ( e, json, data, id ) {
								
				//console.log("postEdit")
								
				//if(opts.localeditor) {
					var rowId = null;
					if (e.target.s.editData.id != null) {
						$.each(e.target.s.editData.id, function(i,v) {
							rowId = v;
						});
						
						var theRow = self.getRowByDataId(rowId);
						changedfield = e.target.s.includeFields[0];

						if(self.editor.field(changedfield).s.opts.type == "select"){
							
							if(changedfield.includes(".")) {
								cfarr = changedfield.split(".");
								var tablestr =  cfarr[0]
								var idstr = cfarr[1];
							
								$.each(self.editor.field(changedfield).s.opts._input[0],function(i,v){
								
									if (data[tablestr][idstr] == $(v).attr("value")) {
										if (data[tablestr].val != null) data[tablestr].val = $(v).html();
										else if (data[tablestr].name != null) data[tablestr].name = $(v).html();
									}
									
							
								});
							
							}
													
							theRow.data(data).draw();
							
						} 
					}
				//}
			});
		},
		insert: function(arr, val, index) {
    return index >= arr.length 
        ? arr.concat(val)
        : arr.reduce((prev, x, i) => prev.concat(i === index ? [val, x] : x), []);
		}
	});
}(jQuery));
