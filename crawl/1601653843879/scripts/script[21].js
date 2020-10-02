/*

HTML-WRITTEN FILE || Script sequence: [21]

*/


		if("ON" != ItgJs.LSget("POPUP_195")){
		    $("#main-modal_195").show();
		    $("#main-modal_195").css("width","530px");
		    $("#main-modal_195 .main-modal__content").css("height","410px");
		    $("#main-modal_195").css("left",leftPos);
		    $("#main-modal_195").css("top",topPos);
		    $("#main-modal_195").css("z-Index",maxZ--);
		    $("#main-modal_195").css("overflow","hidden");
		    //alert($(window).width()+", ");
		    leftPos = leftPos+530+10;
		    if(leftPos > $(window).width()){
		    	topPos = topPos+50;
		    	leftPos = topPos;
		     $("#main-modal_195").css("top",topPos);
		     $("#main-modal_195").css("left",leftPos);
		     leftPos = leftPos+530+10;
		    }
		}else{
			$("#main-modal_195").remove();
		}
	