;(function ( $ ) {
	$.widget("acm.dialog",{
		options: {
			widgets: [],
			semanticOptions: {}
		},

		_create : function() {
			var self = this;
			this.div = $(document.createElement("div")).appendTo(this.element);
			this.icon = $(document.createElement("i")).addClass(this.options.icon ? this.options.icon : "close icon").appendTo(this.div);
			if(this.options.div) this.div.addClass(this.options.div);
			if(this.options.structure) this._structureBuilder(this.div,this.options.structure);
			
			if(this.options.scrollfix) {
				this.options.semanticOptions = $.extend(this.options.semanticOptions,
					{
						onShow: function(){
							$("body").addClass("scrolling");
							$(self.div).addClass("scrolling");
						}
					}
				)
			}
			/*
			this.options.semanticOptions = $.extend(this.options.semanticOptions,
				{
					allowMultiple: true
				}
			)
			*/
			this.div.modal(this.options.semanticOptions);
		},
		
		_structureBuilder : function(rootEl, structure) {
			var self = this;
			$.each(structure, function(i, v) {
				var el = "div";
				$.each(Object.keys(v),function(j, vv){
					if(vv == "icon") el = "i";
					if(vv.match(/^h([a-zA-Z0-9])$/gi)) el = vv; //header h1, h2, ...
					if(vv == "span") el = "span";
					if(vv == "p") el = "p";
					if(vv == "img") el = "img";
				});
				var elId = v[el].match(/(^#|[^&]#)([a-z0-9]+)/gi) ? v[el].match(/(^#|[^&]#)([a-z0-9]+)/gi)[0] : null;
				var elClasses = elId ? v[el].replace(elId,'') : v[el];
				var newEl = $(document.createElement(el)).appendTo(rootEl);
				if(v.html) newEl.html(v.html);
				if(v[el]) newEl.addClass(elClasses);
				if(elId) newEl.attr("id",elId.replace('#','').replace(/\s/g, ''));
				if(v.src) newEl.attr("src",v.src);
				if(v.attr) newEl.attr(v.attr);
				if(v.structure) {
					self._structureBuilder(newEl, v.structure);
				}
			});
		},

		show : function(fetchparam,exclude) {
			
			if(exclude != null) {
				var fetchlist = [];
				$.each(this.options.widgets, function(i,v) {
					if (exclude.includes(v) == false) {
						$.getWidget(v).clear();
						fetchlist.push(v);
						$($.getWidget(v).element).show();
					} else {
						$($.getWidget(v).element).hide();
					}
				});
				while(fetchlist.length > 1) {
					$.getWidget(fetchlist.pop()).fetch("lazy", fetchparam);
				}
				$.getWidget(fetchlist.pop()).fetch("eager", fetchparam);
			} else {
				var lastwidget = this.options.widgets.length > 0 ? this.options.widgets.pop() : null;
				$.each(this.options.widgets, function(i,v) {
					$.getWidget(v).clear();
					$.getWidget(v).fetch("lazy", fetchparam);
					$($.getWidget(v).element).show();
				});
				if(lastwidget) {
					this.options.widgets.push(lastwidget);
					$.getWidget(lastwidget).clear();
					$.getWidget(lastwidget).fetch("eager", fetchparam);
				}
			}
			this.div.modal("show");
		},

		hide : function() {
			this.div.modal("hide");
		},
		
		semantic : function(p1, p2, p3, p4) {
			return this.div.modal(p1, p2, p3, p4);
		},
		
		set : function(data) {},
		
		get : function() {
			return {};
		}

	});
}(jQuery));