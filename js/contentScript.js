var ajaxitems = [];

let settings = null;

chrome.runtime.sendMessage({ type: 'HELLO' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	settings = request.data;
});

function strLength(str) {
	var r = 0;
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		// Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff 
		// Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3 
		if ((c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
			r += 1;
		} else {
			r += 2;
		}
	}
	return r;
}

function showLength(id, str) {
	var strCount = strLength(str);
	var ptcnt = 0;
	var linecount = str.split("\n");
	var linemes = "";
	var ptmax = 750;
	var linemax = 10;

	if (settings.moon === 'itigeki' || settings.moon === 'kechi' || settings.moon === 'setsuyaku' ||
		settings.moon === 'bbs_kyu' || settings.moon === 'bbs_plus' || settings.moon === 'bbs') {
		strCount = str.length;
	}

	/*
	if (strCount <= 50) {
		ptcnt = 20;
	} else {
		ptcnt = Math.floor(((strCount - 50) / 14) + 20);
	}
	if (strCount === 0) {
		ptcnt = 0;
	}
	*/

	if (settings.moon === 'mokugeki' || settings.moon === 'kamoku' || settings.moon === 'nokin' ||
		settings.moon === 'sisso' || settings.moon === 'monogatari') {
		linemax = 10;
	}
	else if (settings.moon === 'sinmon' || settings.moon === 'taben') {
		linemax = 20;
	}
	else if (settings.moon === 'netsuben') {
		linemax = 30;
	}
	else if (settings.moon === 'ichigeki' || settings.moon === 'kechi' ||
			settings.moon === 'setsuyaku' || settings.moon === 'bbs_kyu') {
		linemax = 5;
	}
	else if (settings.moon === 'bbs_plus' || settings.moon === 'bbs'){
		linemax = 10;
	}
	else {
		linemax = settings.moon_lines;
	}

	if (linecount.length > linemax) {
		linemes = "<font color=\"red\" style=\"font-size:85%\">※行数オーバーです。（MAX" + linemax + "行\/現在" + linecount.length + "行）</font>";
	} else {
		linemes = "";
	}

	if (settings.moon === 'mokugeki' || settings.moon === 'kamoku' || settings.moon === 'nokin' ||
		settings.moon === 'sisso' || settings.moon === 'monogatari') {
		ptmax = 750;
	}
	else if (settings.moon === 'sinmon' || settings.moon === 'taben' || settings.moon === 'netsuben') {
		ptmax = 1000;
	}
	else if (settings.moon != 'jiyu') {
		ptmax = 200;
	}
	else {
		ptmax = settings.moon_bytes;
	}

	var ptover = "";
	if (strCount > ptmax) {
		ptover = "<font color=\"red\" style=\"font-size:85%\">※一発言分の文字数をオーバーしています</font>";
	} else {
		ptover = "";
	}

	if ((ptover != "") && (linemes != ""))
		$(id).prev("#mes_filter").html(ptover + "<br>" + linemes);
	else if ((ptover != "") && (linemes == ""))
		$(id).prev("#mes_filter").html(ptover);
	else if ((ptover == "") && (linemes != ""))
		$(id).prev("#mes_filter").html(linemes);
	else
		$(id).prev("#mes_filter").html("");

	//$("span[id^=txt_mes_]").text(ptcnt + "pt");
	//$(id).parent(".msg").find("span[id^=txt_mes_]").text(ptcnt + "pt");
}

function showLength_mln(id, str) {
	var strCount = strLength(str);
	var ptcnt = 0;
	var linecount = str.split("\n");
	var linemes = "";
	var ptmax = 750;
	var linemax = 10;

	if (strCount <= 50) {
		ptcnt = 20;
	} else {
		ptcnt = Math.floor(((strCount - 50) / 14) + 20);
	}
	if (strCount === 0) {
		ptcnt = 0;
	}

	if (settings.melon === 'bbs_kakucho' || settings.melon === 'hakogata') {
		linemax = 10;
	}
	else if (settings.melon === 'monogatari' || settings.melon === 'sinmon' || settings.melon === 'taben' ||
		settings.melon === 'soudatsusen' || settings.melon === 'tinmoku' || settings.melon === 'oshu') {
		linemax = 20;
	}
	else if (settings.melon === 'bbs' || settings.melon === 'setsuyaku') {
		linemax = 5;
	}

	if (linecount.length > linemax) {
		linemes = "<font color=\"red\" style=\"font-size:85%\">※行数オーバーです。（MAX" + linemax + "行\/現在" + linecount.length + "行）</font>";
	} else {
		linemes = "";
	}

	if (settings.melon === 'monogatari') {
		ptmax = 750;
	}
	else if (settings.melon === 'sinmon' || settings.melon === 'taben' ||
		settings.melon === 'sodatsusen' || settings.melon === 'tinmoku') {
		ptmax = 1000;
	}
	else if (settings.melon === 'bbs' || settings.melon === 'bbs_kakucho' || settings.melon === 'setsuyaku') {
		ptmax = 200;
	}
	else if (settings.melon === 'hakogata') {
		ptmax = 300;
	}
	else {
		ptmax = 400;
	}

	var ptover = "";
	if (strCount > ptmax) {
		ptover = "<font color=\"red\" style=\"font-size:85%\">※一発言分の文字数をオーバーしています</font>";
	} else {
		ptover = "";
	}

	if ((ptover != "") && (linemes != ""))
		$(id).prev("#mes_filter").html(ptover + "<br>" + linemes);
	else if ((ptover != "") && (linemes == ""))
		$(id).prev("#mes_filter").html(ptover);
	else if ((ptover == "") && (linemes != ""))
		$(id).prev("#mes_filter").html(linemes);
	else
		$(id).prev("#mes_filter").html("");

	$("span[id^=pt_count]").text(ptcnt + "pt消費");
}

function moonpupa(){

	//$("textarea[id^=mes_]").removeAttr('onkeyup');
	//$("textarea[id^=mes_]").removeAttr('onchange');
	$("textarea[id^=mes_]").before("<span id='mes_filter'></span>");

	$("textarea[id^=mes_]").on('keyup mouseup change', function (e) {
		showLength($(this), $(this).val());
	});

	$(document).on('click', '.close', function (e) {
		var ank = $(this);
		var base = ank.parents(".ajax");
		base.fadeOut("nomal", function () {
			base.remove();
		});
		return false;
	});

	$(document).on('click', '.res_anchor', function (e) {
		e.preventDefault();
		var ank = $(this);
		var base = ank.parents("table[class^='mes_']").parent();
		var basenext = base.next("div");
		var text = ank.text();
		var htmltext = ank.children('img').attr('src');
		var title = ank.attr("title");
		var timeid = parseInt(new Date().getTime() / 1000);
		if ((0 === text.indexOf(">>")) || (htmltext === "img/memo.png")) {
			var href = this.href.replace("#", "&l=").replace("&move=page", "").replace("mv=p", "").replace("&ra=on", "").replace(/\&r=\d+/, "").replace(/\&puname=\d+/, "");
			href = href + "&r=1";
			$.get(href, {}, function (data) {
				var date = $(data).find(".mes_date");
				var mes = date.parents("table[class^='mes']").parent("div");
				mes.css('width', $("table[class^='mes']").width());
				var handlerId = "handler" + (new Date().getTime());
				var handler = $("<div id=\"" + handlerId + "\"></div>").addClass("handler");
				var close = $("<span>[close]</span>");
				close.addClass("close").css({ "font-size": "80%", "margin": "5px 5px 5px 5px", "cursor": "pointer", "float": "right" });
				var name = $(mes).find(".mesname,.action");
				mes.addClass("ajax").css('display', 'none').css('position', 'absolute');

				var text1 = basenext.find(".mes_text,.action").text().split("[close]")[0];
				var text2 = mes.find(".mes_text,.action").text().split("[close]")[0];

				if (text1 == text2) {
					var re = basenext;
					re.fadeOut("nomal", function () {
						re.remove();
					});
					return false;
				}

				var handlerId = "handler" + (new Date().getTime());
				var handler = $("<div id=\"" + handlerId + "\"></div>").css({ "background": "#424A76", "height": "15px", "opacity": "0.7", "margin": "0px 10px" });
				$(mes).clone(true).css('display', 'none').addClass("origin").insertAfter($(mes));
				$(mes).addClass("drag");
				$(mes).prepend(handler);
				$(mes).easydrag();
				$(mes).setHandler(handlerId);

				name.append(close);
				base.after(mes);
				$(mes).prepend(handler);
				ajaxitems.push(mes);
				var topm = e.pageY + 16;
				var leftm = e.pageX;
				var leftend = $(document).width() - mes.width() - 8;

				if (leftend < leftm) {
					leftm = leftend;

				}
				mes.css({ top: topm, left: leftm, zIndex: (timeid) });
				$(mes).fadeIn();
				$(mes).easydrag();
				$(mes).setHandler(handlerId);
			});
		} else {
			window.open(this.href, '_blank');
			return false;
		}
	});
}

function melon() {

	$("textarea[id^=mes]").before("<div id='mes_filter'></span>");
	$("textarea[id^=mes]").parent("div").append("<span id='pt_count' style='background-color:#fff;color:#000;padding:1px 2px;'>0pt消費</span>");

	$("textarea[id^=mes]").on('keyup mouseup change', function (e) {
		showLength_mln($(this), $(this).val());
	});

	$(document).on('click', '.close', function (e) {
		var ank = $(this);
		var base = ank.parents(".ajax");
		base.fadeOut("nomal", function () {
			base.remove();
		});
		return false;
	});

	$(document).on('click', '.res_anchor', function (e) {
		e.preventDefault();
		var ank = $(this);
		var base = ank.parents("div[id^='mestype']");
		var basenext = base.next("div");
		var text = ank.text();
		var htmltext = ank.children('img').attr('src');
		var title = ank.attr("title");
		var timeid = parseInt(new Date().getTime() / 1000);
		if ((0 === text.indexOf(">>")) || (htmltext === "img/memo.png")) {
			var href = this.href.replace("#", "&l=").replace("&move=page", "").replace("mv=p", "").replace("&ra=on", "").replace(/\&r=\d+/, "").replace(/\&puname=\d+/, "");
			href = href + "&r=1";
			$.get(href, {}, function (data) {
				var date = $(data).find(".mes_date");
				var mes = date.parents("div[id^='mestype']");
				mes.css('width', $("div[id^='mestype']").width());
				var handlerId = "handler" + (new Date().getTime());
				var handler = $("<div id=\"" + handlerId + "\"></div>").addClass("handler");
				var close = $("<span>[close]</span>");
				close.addClass("close").css({ "font-size": "80%", "margin": "5px 5px 5px 5px", "cursor": "pointer", "float": "right" });
				var name = $(mes).find(".mesname,.action_txt");
				mes.addClass("ajax").css('display', 'none').css('position', 'absolute');

				var text1 = basenext.find(".mes_text,.action_txt").text().split("[close]")[0];
				var text2 = mes.find(".mes_text,.action_txt").text().split("[close]")[0];

				if (text1 == text2) {
					var re = basenext;
					re.fadeOut("nomal", function () {
						re.remove();
					});
					return false;
				}

				var handlerId = "handler" + (new Date().getTime());
				var handler = $("<div id=\"" + handlerId + "\"></div>").css({ "background": "#424A76", "height": "15px", "opacity": "0.7", "margin": "0px 10px" });
				$(mes).clone(true).css('display', 'none').addClass("origin").insertAfter($(mes));
				$(mes).addClass("drag");
				$(mes).prepend(handler);
				$(mes).easydrag();
				$(mes).setHandler(handlerId);

				name.append(close);
				base.after(mes);
				$(mes).prepend(handler);
				ajaxitems.push(mes);
				var topm = e.pageY + 16;
				var leftm = e.pageX;
				var leftend = $(document).width() - mes.width() - 8;

				if (leftend < leftm) {
					leftm = leftend;

				}
				mes.css({ top: topm, left: leftm, zIndex: (timeid) });
				$(mes).fadeIn();
				$(mes).easydrag();
				$(mes).setHandler(handlerId);
			});
		}
	});

}

if (location.host == "www.moonpupa.jp") {
	moonpupa();
}
else if (location.host == "melon-cirrus.sakura.ne.jp"){
	chrome.runtime.sendMessage({ type: 'HELLO', value: { contents: 'aaa' } });
	melon();
}