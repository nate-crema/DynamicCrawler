/*

HTML-WRITTEN FILE || Script sequence: [9]

*/


$(document).ready(function(){	
	// quick slide
	var sec_width = $(".link_btn02 ul li").innerWidth();
	var sec_length = $(".link_btn02 ul li").length;
	$(".link_btn02 ul").css("width", sec_width*sec_length+100 );
   
	var num = 0;
	$(".right_arrow").click(function(){
		$(".link_btn02 ul li").css("position","relative");
		if(num < 6){ // 오른쪽으로 넘길갯수
			num += 1;
			$(".link_btn02 ul li").animate({left: -91*num+"px"}, 200, "easeOutQuart");
		}
	});
	$(".left_arrow").click(function(){
		if(num>0){
			num -= 1;
			$(".link_btn02 ul li").animate({left: -91*num + "px"}, 200, "easeOutQuart");
		}
	});
	
	// lib_culture toggle
	$townToggle=$(".lib_culture .btn_townOpen");
	$townToggle.click(function(){
		$(this).toggleClass("active");
		$("#selectbox_town").slideToggle(100);
	});

});
