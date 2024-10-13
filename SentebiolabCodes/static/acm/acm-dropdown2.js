;(function ( $ ) {
	$.widget("acm.ddown",{
		options: {},
		
		_create : function() {
			this.div = $(document.createElement("div")).appendTo(this.element);
			if(this.options.div) this.div.addClass(this.options.div);
			if(this.options.name) {
				this.input = $(document.createElement("input")).attr("type","hidden").attr("name",this.options.name).appendTo(this.div);
			}
			var self = this;
			if(this.options.header) {
				var self = this;
				self.header = [];
				$.each(this.options.header,function(i,v) {
					if(v.html) self.div.html(self.div.html() + v.html);
					else self.header.push($(document.createElement(v.icon ? "i" : Object.keys(v)[0])).addClass(Object.values(v)[0]).appendTo(self.div));
				});
			}
			this.menu = $(document.createElement("div")).appendTo(this.div)
			if(this.options.menu) this.menu.addClass(this.options.menu); else this.menu.addClass("menu");
			if(!this.options.dataformat) this.options.dataformat = {
				id: "id",
				val: "val",
				div: "item "
			};
			else {
				if(!this.options.dataformat.id) this.options.dataformat.id = "id";
				if(!this.options.dataformat.val) this.options.dataformat.val = "val";
				if(!this.options.dataformat.div) this.options.dataformat.div = "item"; else this.options.dataformat.div = "item " + this.options.dataformat.div;
			}
		},
		
		set : function(data) {
			if($.type(data) != "object" && $.type(data) != "array") {
				this.div.dropdown('set selected', data);
				let div = this.menu.find("div[data-value='" + this.get() + "']").first();				
				if (div) {
					if(div.hasClass("disabled")) {
						this.selectfirst();
					}
				}
				return;
			}
			var self = this;
			$.each(data, function(i, v) {
				var newDiv = $(document.createElement("div")).appendTo(self.menu);
				if(self.options.optionsdisabled) newDiv.addClass("disabled");
				if(self.options.dataformat.div) newDiv.addClass(self.options.dataformat.div);
				newDiv.attr("data-value",v[self.options.dataformat.id]);
				if(!v.icon && self.options.dataformat.icon) $(document.createElement("i")).addClass(self.options.dataformat.icon).appendTo(newDiv);
				if(!v.img && self.options.dataformat.img) {
					$(document.createElement("img")).appendTo(newDiv);
					newDiv.img(self.options.dataformat.img);
				}
				$.each(v, function(k, vv) {
					if(k == self.options.dataformat.val)  newDiv.html(newDiv.html() + v[self.options.dataformat.val]);
					if(k == "icon")  $(document.createElement("i")).addClass(v.icon).appendTo(newDiv);
					if(k == "img") {
						$(document.createElement("img")).appendTo(newDiv);
						newDiv.img($.extend({},vv,self.options.dataformat.img));
					}
					if(k == "link") newDiv.click(function(){
						window.location.href = vv;
					});
					if(k == "func") newDiv.click($.getFunction(vv));
				});
			});
			
			if (this.options.def) {
				var defDiv = $(document.createElement("div")).prependTo(self.menu);
				if(self.options.dataformat.div) defDiv.addClass(self.options.dataformat.div);
				defDiv.attr("data-value",this.options.def.id);
				defDiv.html(this.options.def.val);
			}
			
			if (this.options.semanticOptions) this.div.dropdown(this.options.semanticOptions);
			else this.div.dropdown();
			if(this.options.selected != undefined) {
				if (this.options.selected == "") {
					if(this.menu.find('div:not(.disabled)')) {
						this.div.dropdown('set selected',$(this.menu.find('div:not(.disabled)')[0]).attr("data-value"));
					}
				} else {
					this.div.dropdown('set selected',this.options.selected);
				}
			}
			if(this.options.onchange != undefined) {
				this.setonchange(this.options.onchange);
			}
		},
		
		get : function() {
			return this.div.dropdown("get value");
		},
		
		setonchange : function(func) {
			var self = this;
			this.div.change(function(){
				func(self)
			})
		},
		
		setdisabled : function(data) {
			var self = this;
			if($.type(data) != "object" && $.type(data) != "array") {
				let div = this.menu.find("div[data-value='" + data + "']").first();
				if(div) div.addClass("disabled")
				return;
			}
			if($.type(data) == "object") return;
			this.menu.find("[data-value='" + data.join("'],[data-value='") + "']").addClass("disabled");
		},
		
		setenabled : function(data) {
			var self = this;
			if($.type(data) != "object" && $.type(data) != "array") {
				let div = this.menu.find("div[data-value='" + data + "']").first();
				if(div) div.removeClass("disabled")
				return;
			}
			if($.type(data) == "object") return;
			this.menu.find("[data-value='" + data.join("'],[data-value='") + "']").removeClass("disabled");

		},
		
		disableall : function(){
			this.menu.find("div").addClass("disabled");
			this.semantic("clear");
		},
		
		enableall : function(){
			this.menu.find("div").removeClass("disabled");
			this.semantic("clear");
		},
		
		selectfirst : function() {
			if(this.menu.find('div:not(.disabled)')) {
				this.div.dropdown('set selected',$(this.menu.find('div:not(.disabled)')[0]).attr("data-value"));
			}
		},
		
		semantic : function(p1, p2, p3, p4) {
			return this.div.dropdown(p1, p2, p3, p4);
		},
		
		disablewidget: function(b) {
			if (this.input) this.input.attr("disabled",b);
			if (b == true) {
				this.div.addClass('read-only');
				this.div.addClass('disabled');
			}
			else {
				this.div.removeClass('read-only');
				this.div.removeClass('disabled');
			}
		}
		
	});
}(jQuery));