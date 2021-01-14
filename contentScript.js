var ajaxitems = [];

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
		var mesrole = ".mes_nom,.mes_wolf,.mes_grave,.mes_think,.mes_dragon,.mes_love,.mes_mob";
		var mesnom = ank.parents(mesrole);
		var base = mesnom.parent();
		var text = ank.text();
		var htmltext = ank.children('img').attr('src');
		var title = ank.attr("title");
		var timeid = parseInt(new Date().getTime() / 1000);
		if ((0 === text.indexOf(">>")) || (htmltext === "img/memo.png")) {
			var href = this.href.replace("#", "&l=").replace("&move=page", "").replace("mv=p", "").replace("&ra=on", "").replace(/\&r=\d+/, "").replace(/\&puname=\d+/, "");
			href = href + "&r=1";
			$.get(href, {}, function (data) {
				var date = $(data).find(mesrole);
				var mes = date.parent("div");
				mes.css('width', $(mesrole).width());	
				var handlerId = "handler" + (new Date().getTime());
				var handler = $("<div id=\"" + handlerId + "\"></div>").addClass("handler");
				var close = $("<span>[close]</span>");
				close.addClass("close").css({ "font-size": "80%", "margin": "5px 5px 5px 5px", "cursor": "pointer", "float": "right" });
				var name = $(mes).find(".mesname,.action,.memoright");
				mes.addClass("ajax").css('display', 'none').css('position', 'absolute');
				
				var handlerId = "handler" + (new Date().getTime());
				var handler = $("<div id=\"" + handlerId + "\"></div>").css({"background": "#424A76", "height": "15px", "opacity": "0.7", "margin": "0px 10px"});
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