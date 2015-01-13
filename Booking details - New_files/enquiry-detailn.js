// JavaScript Document

$(function() {
	$("#lovedby-slider").carouFredSel({
		width: "100%",
		height: "auto",
		scroll: 2,
		prev: ".lbs-prev",
		next: ".lbs-next",
		auto: false
	});
});

$(document).ready(function(e) {
	
	$(".btnRB").click(function(){
		var rtn = validateForm();
		
		if(rtn)
		{
			//add loading
			var hcmthn = $(".rblm");
			if(hcmthn.find("span").length > 0) { return false; }		
			hcmthn.append("<span>&nbsp;&nbsp;<i class=\"fa fa-spinner fa-spin\"></i></span>");
			//--
			
			var vetpa = $("input[name=etpa]").val();
			ga('send', 'event', 'Enquiry', 'PropNameArrDate', vetpa);
			//_gaq.push(["_trackEvent", "Enquiry", "PropNameArrDate", vetpa]);
		}

		return rtn;
	});	
});


var global_fieldtofocus = "";

var validateForm = function () {
	clearAuthMessages();
	var rtn = true;
	var elem = "";
	
	elem = $("#rbmfn");
	if ($.trim(elem.val()).length == 0) {
		displayMessage("#auth"+elem.prop("id"), "Please enter first name", elem);
		rtn = false;
	}
	
	elem = $("#rbmln");
	if ($.trim(elem.val()).length == 0) {
		displayMessage("#auth"+elem.prop("id"), "Please enter last name", elem);
		rtn = false;
	}
	
	elem = $("#rbme");
	if ($.trim(elem.val()).length == 0) {
		displayMessage("#auth"+elem.prop("id"), "Please enter email", elem);
		rtn = false;
	}
	
	elem = $("#rbmp");
	if ($.trim(elem.val()).length == 0) {
		displayMessage("#auth"+elem.prop("id"), "Please enter phone number", elem);
		rtn = false;
	}
	
	elem = $("#rbda");
	if (parseInt(elem.val()) == 0) {
		displayMessage("#auth"+elem.prop("id"), "Please select no. of adult", elem);
		rtn = false;
	}
	
	elem = $("#rbdc");
	if (parseInt(elem.val()) == 0) {
		displayMessage("#auth"+elem.prop("id"), "Please select no. of children", elem);
		rtn = false;
	}
	
	elem = $("#terms");
	if (!elem.is(":checked")) {
		displayMessage("#auth"+elem.prop("id"), "You must agree to our terms and conditions", elem);
		rtn = false;
	}
	
	return rtn;
};

var displayMessage = function (msgid, msgtext, fieldtofocus) {
	var msg = $(msgid);
	msg.text(msgtext).fadeIn("fast");

	if (fieldtofocus) {
		if(global_fieldtofocus == ""){
			global_fieldtofocus = fieldtofocus;
			fieldtofocus.focus();
		}
		fieldtofocus.unbind("change").change(function () {
			msg.fadeOut("fast");
			validateForm();
		});
	}
};

var clearAuthMessages = function () {
	global_fieldtofocus = "";
	var msgs = $(".authError");
	msgs.hide().removeClass("selected");
};