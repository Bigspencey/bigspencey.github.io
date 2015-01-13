// JavaScript Document

$(function() {
    $("img.lazy").lazyload({
		effect: "fadeIn",
		skip_invisible : false,
		placeholder: ""
	});
});

var spppop = function(ppurl){
	if(ppurl.length > 0)
	{
		$.colorbox({
			iframe: true, 
			width: "1170px", 
			height: "730px",
			href: ppurl,
			overlayClose: false,
			escKey: false,
			className: "colorbox-planner-pack"
		});	
	}
};

$(document).ready(function(){
	
	if(exitpopup)
	{
		//exit splash comment for now
		$(document).mousemove(function(e){ 
			if(e.clientY <= 5){ 
				//Show the exit popup 
				if($("#colorbox").css("display") != "block" && !exitppShown)
				{  
					exitppShown = true;
					spppop('/planner-pack/exit/');
					$.post("/", {act:"epp"}, function(d){ }, "json");
				}
			}
		});
	}
	
	$(".btnBC").click(function(){
		$.colorbox({
			iframe:true, 
			width:"925px", 
			height:"550px",
			top: "50px",
			href: $(this).prop("href")
		});	
		
		return false;
	});
	
	if($(".form-mini-search").length > 0)
	{
		$(".form-mini-search").find("button").prop("disabled", false);
	}
	
	$(".form-mini-search").submit(function(){
		var frm = $(this);
		
		frm.find("select").each(function(i){
			if($(this).val() == "all" || $(this).val() == "0")
			{ 
				$(this).prop("disabled", true); 
			}
		});
		
		frm.find("button").prop("disabled", true);
	});
	
	$(".btn-backtop").click(function(){
		$("html, body").animate({ scrollTop: 0 }, 1000);
		return false;
	});
	
	$(".tweet").linkify({
		target: "_blank",
		includeW3: false,
		hashtagUrlBuilder: function(hashtag){
			return "https://twitter.com/search?q="+hashtag;	
		}
	});
	
	$("body").on("click", ".link-addtoSL", function(){
		var sllink = $(this);
		var sspn = sllink.find("span");
		var sli = sllink.find("i");
		var furl = sllink.prop("href");
		
		var slv = $(".cvsl");
		
		$.post(furl, {act:sllink.data("act"), pid:sllink.data("pid")}, function(d){
			var slct = 0;
			if(d.a == "success")
			{
				slct = parseInt(d.ct);
				
				slv.remove();
				sspn.text(d.t);
				sli.removeClass("fa-heart fa-heart-o").addClass(d.c);
				if(sllink.data("vlink") == "yes")
				{
					var vlink_html = "<span class=\"cvsl\">";
					if(sllink.data("separator") == "break")
					{
						vlink_html += "<br />";
					}
					else
					{
						vlink_html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";	
					}
					
					if(sllink.data("map") == "yes")
					{
						vlink_html += "<a href=\"/shortlist/\" class=\"\"><i class=\"fa fa-star mr5\"></i><span>View Shortlist</span></a></span>";
					}
					else
					{
						vlink_html += "<a href=\"/shortlist/\" class=\"\"><span>View Shortlist</span><i class=\"fa fa-star fa-lg ml5\"></i></a></span>";
					}
					
					sllink.after(vlink_html);
					
				}
				
				if(d.c == "fa-heart" && $(".sl-plink").length > 0)
				{
					var psec = sllink.parents(".prl-section:first");
					psec.prepend("<div class=\"textalerts alert noround alert-"+d.a+"\">Removed from your shortlist. Now <a href=\""+furl+"\" class=\"italic bold\">refresh</a> your shortlist.</div>");
				}
			}
			
			var slct = parseInt(d.ct);
			var hsl = $(".header-sllink");
			
			if(!hsl.is(":visible") && slct > 0)
			{
				hsl.removeClass("displaynone");
			}
			else if(hsl.is(":visible") && slct <= 0)
			{
				hsl.addClass("displaynone");
			}
		}, "json");
		
		return false;
	});
	
	$("body").on("click", ".link-lstAddtoSL", function(){
		var sllink = $(this);
		var pul = sllink.parents("ul:first");
		var plii = pul.find(".slullii");
		var plit = pul.find(".slullit");
		var sli = plii.find("i");
		var slt = plit.find("a");
		var furl = sllink.prop("href");
		var slv = pul.find(".slulliv");
		var slvall = $(".slulliv");
		
		$.post(furl, {act:sllink.data("act"), pid:sllink.data("pid")}, function(d){
			var slct = 0;
			if(d.a == "success")
			{
				slct = parseInt(d.ct);
				//slvall.hide();
				slv.hide();
				
				if(d.t == "Remove from shortlist")
				{
					slv.removeClass("hide");
					slv.show();
					slt.html("Remove<br />from Shortlist");
				}
				else
				{
					slt.html("Add to<br />Shortlist");
				}
				
				sli.removeClass("fa-heart fa-heart-o").addClass(d.c);
				
				if(d.c == "fa-heart" && $(".sl-plink").length > 0)
				{
					var psec = sllink.parents(".prl-section:first");
					psec.prepend("<div class=\"textalerts alert noround alert-"+d.a+"\">Removed from your shortlist. Now <a href=\""+furl+"\" class=\"italic bold\">refresh</a> your shortlist.</div>");
				}
			}
			
			var slct = parseInt(d.ct);
			var hsl = $(".header-sllink");
			
			if(!hsl.is(":visible") && slct > 0)
			{
				hsl.removeClass("displaynone");
			}
			else if(hsl.is(":visible") && slct <= 0)
			{
				hsl.addClass("displaynone");
			}
		}, "json");
		
		return false;
	});
});