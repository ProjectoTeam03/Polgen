$(document).ready(function () {
		$(".primerName").each(function () {
				var pname = $(this).text();
				if (pname.length > 17) pname = cropString(pname, 17, 7);
				$(this).text(pname);
		});

		$(".rhead").each(function (i) {
				var txt = $(this).text().toLowerCase();
				if (txt.length > 54) txt = cropString(txt, 54, 26);
				$(this).text(txt);
				$(this).addClass("capitalize");
		});

		$(".removeItem").on('click', function () {
				var elem = $(this).closest('.singlereport');
				elem.fadeOut();
		});

		$(".hideItem").on('click', function () {
				var elem = $(this).closest('.singlereport');
				elem.fadeTo(900, 0, function () {
						elem.css("visibility", "hidden");
				});
		});
		$(".rmsingleprimer").on('click', function () {
				var elem = $(this).parent('.itemLine');
				elem.fadeOut();
				elem.next("br").remove();
		});
});

var cropString = function (s, n, r) {
		var l = s.length;
		if (l > n) {
				return s.substring(0, r) + "..." + s.substring(l - r, l);
		}
};