$(document).ready(function () {

	$("#tarihDegistir").on('click', function (e) {
		 e.preventDefault();
		 var arr = $("#tarihInput").val().split(/\s+/);

		 if (arr.length > 1) {
				$(arr).each(function (ind, value) {
					 $($(".sentezNoClass")[ind]).text(value);
				});
		 } else if (arr.length == 1) {
				var yeniTarih = $("#tarihInput").val();
				var ind = yeniTarih.lastIndexOf("-");
				var pre = yeniTarih.substring(0, ind);
				var pos = yeniTarih.substring(ind + 1, yeniTarih.length);
				var n = Number(pos);
				$(".sentezNoClass").each(function (i) {
					 $(this).text(pre + "-" + (n));
					 n++;
				});
		 }
	});

	$(".editSentezNo").on('change', function () {
		 console.log($(this).val());
		 $(this).closest('tr').find('.sentezNoClass').text($(this).val());
	});
	$(".editCompanyName").on('change', function () {
		 console.log($(this).val());
		 $(this).closest('tr').find('.itemCompanyName').text($(this).val());
	});
	$(".editSkala").on('change', function () {
		 console.log($(this).val());
		 $(this).closest('tr').find('.reportSkala').text($(this).val());
	});
	$(".editSaflastirma").on('change', function () {
		 console.log($(this).val());
		 $(this).closest('tr').find('.reportSaflastirma').text($(this).val());
	});
	$(".removeReport").on('click', function () {
		 var elem = $(this).closest('.single-report');
		 elem.remove();
	});

	/*
	$(".reportData").each(function () {
		 var msg = $(this).text();
		 var tmp = "";
		 for (var t = 0; t < msg.length; t++) {
				if (t > 0 && t % 3 == 0) {
					 tmp += " ";
				}
				tmp += msg[t];
		 }
		 $(this).text(tmp);
	});
	*/
});