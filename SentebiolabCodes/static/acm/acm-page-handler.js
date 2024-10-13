;(function ( $ ) {
	
	var pagewidgets ={};
	var forms = [];
	var funcs = {};
	
	$.createWidgets = function(widgets) { //TODO re-try any parentless widgets.
		var encounteredwidget = null;
		//$.Widget.clearAjaxQueue();
		$.each(widgets,function(k,v) {
			pagewidgets[k] = $(v.selector)[v.type]($.extend(v.options,{"id":k}))[v.type]("instance"); //TODO assign id to widgets selected by multiple nodes.
			if(v.options.oncreate && v.options.datasource){
				if($.Widget.getService(v.options.datasource).source != "static" && !encounteredwidget) encounteredwidget = v;
				else $(v.selector)[v.type]("fetch","lazy");
			}
			if(v.type == "widgetform") forms.push(pagewidgets[k]);
		});
		if(encounteredwidget) {
			$(encounteredwidget.selector)[encounteredwidget.type]("fetch","eager"); 
			//console.log(encounteredwidget.selector);
		}
		$.each(forms, function(k, v) {
				v.init();
		});
		$(document).trigger("pagecreated");
	};
	
	$.registerServices = function(services) {
		$.each(services, function(k, v) {
			$.Widget.registerService(k, v);
		});
	};
	
	$.registerFunctions = function(funcs) {
		$.each(funcs, function(k, v) {
			eval("$.registerFunction('" + k + "' , " + v + ");");
		});
	};
	
	$.formAction = function(src, trg, cb) {
		var params = {};
		$.each(src, function(k,v) {
			if(pagewidgets[v]) params[k] = pagewidgets[v].get();
			else params[k] = v;
		});
		
		
		if($.type(trg) == "array") {
			var last = trg.pop();
			$.each(trg, function(i,v) {
				pagewidgets[v].fetch("lazy",params);
			});
			if(last) pagewidgets[last].fetch("eager",params);
		} else if($.type(trg) == "string" && !cb) {
			pagewidgets[trg].fetch("eager",params);
		} else if($.type(trg) == "string" && $.type(cb) == "function") {
			$.Widget.fetch(trg,params,cb);
		} else if( $.type(trg) == "object" && $.type(cb) == "function") {
			$.Widget.fetch(trg.service,trg.params,cb);
		} else {
			console.log("formAction: wrong usage!");
		}
	};
	
	$.getWidget = function(id) {
		return pagewidgets[id];
	};
	
	$.getWidgetList = function() {
		return pagewidgets;
	};
	
	$.createPage = function(page) {
		if(page.services) $.registerServices(page.services);
		if(page.functions) $.registerFunctions(page.functions);
		if(page.widgets) $.createWidgets(page.widgets);
		$( document ).ajaxComplete(function() {
			$(".progressbar").progress();
		});
	};
	
	$.registerFunction = function(name, func) {
		funcs[name] = func;
	};
	
	$.getFunction = function(name) {
		return funcs[name];
	};
	
	//$.holdReady( true );
	
	$.acm_auth("configure",{login:"index.html"});
	$.acm_auth("init");
	$.acm_auth("setUser");
	$.Widget.setUser($.acm_auth("getUser"));

	if($.acm_auth("getUser").token && window.location.pathname != "" && window.location.pathname != "/")
	$(document).ready(function() {
		$.ajax("/page",{
			type: "POST",
			contentType:"application/json",
			dataType: "json",
			data: JSON.stringify({"pageid":window.location.pathname.match(/^\/\w+./gi)[0].replace('/','').replace('.','')}),
			headers: {
				"Authorization": "JWT " +  $.acm_auth("getUser").token
			}
		}).done(function(data){
			$.createPage(data.page);
		}).catch(function(err) {
			console.log(err);
		});
	});
	
	//$.holdReady( false );
	
}(jQuery));