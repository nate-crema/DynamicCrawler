/*

HTML-WRITTEN FILE || Script sequence: [13]

*/


$(function(){
	//왼쪽메뉴, 모바일메뉴
    var page   = $navi.split("_");
    var depth1 = page[0] - 1;
    var depth2 = page[1] - 1;
    var depth3 = page[2] - 1;
	var depth4 = page[3] - 1;
        
    var sub1   = depth1 + 1;
    var sub2   = depth2 + 1;
    var sub3   = depth3 + 1;
	var sub4   = depth4 + 1;

	var mGnbD1   = $('.total_m > ul > li:eq(' + depth1 + ')');
	var mGnbD2   = $('.total_m > ul > li:eq(' + depth1 + ') > ul > li:eq(' + depth2 + ')');
	var mGnbD3   = $('.total_m > ul > li:eq(' + depth1 + ') > ul > li:eq(' + depth2 + ') > ul > li:eq(' + depth3 + ')');
	var mGnbD4   = $('.total_m > ul > li:eq(' + depth1 + ') > ul > li:eq(' + depth2 + ') > ul > li:eq(' + depth3 + ') > ul > li:eq(' + depth4 + ')');
	var lnbD1   = $('#lnb > li:eq(' + depth2 + ')');
	var lnbD2   = $('#lnb > li:eq(' + depth2 + ') > ul > li:eq(' + depth3 + ')');
	var lnbD3   = $('#lnb > li:eq(' + depth2 + ') > ul > li:eq(' + depth3 + ') > ul > li:eq(' + depth4 + ')');
        
    if (page[1] != 0) {
		mGnbD1.addClass('open');
		mGnbD2.addClass('open');
		mGnbD3.addClass('open');
		mGnbD4.addClass('on');
		lnbD1.addClass('open');
		lnbD2.addClass('open');
		lnbD3.addClass('on');
    }
	$('.total_m > ul > li.open > ul').css('display','block');
	$('.total_m > ul > li > ul > li.open > ul').css('display','block');
	$('.total_m > ul > li > ul > li > ul > li.open > ul').css('display','block');
	$('#lnb > li.open > ul').css('display','block');
	$('#lnb > li > ul > li.open > ul').css('display','block');

	/* 모바일메뉴, lnb메뉴 */
	$('.total_m li.has-sub>button, #lnb li.has-sub>a').on('click', function(){
		//$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp('fast');
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown('fast');
			element.siblings('li').children('ul').slideUp('fast');
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp('fast')
		}
		return false;
	});
});

$(function(){
	//전체메뉴
	$(".btn_total").on('click', function() {
		$('#total_m_lay').slideToggle("fast");
		$(this).toggleClass("on");
		//$(".shadow_device").fadeToggle('slow');
		return false;
	});

	//모바일 좌측에서 우측으로 이동
	$(".SideBtn").click(function(){
		$(".fix_bg").show();
		$(".top_link").stop().animate( { left: "0" }, 200, 'easeOutExpo' );
		$("#total_m_lay").stop().animate( { left: "0" }, 200, 'easeOutExpo' );
		$("#container").addClass("wra_box");
		$(".wra_box").stop().animate( { left: "240px" }, 200, 'easeOutExpo' );
		$("#headerWrap").css('position','absolute');
		$("#footer_outer").hide();
		$("#total_m_lay").after('<div class="btnMenuClose"><a href="#">닫기</a></div>').show();
		$(".fix_bg, .btnMenuClose").click(function(){
			$(".btnMenuClose").remove();		
			$("#footer_outer").show();
			$(".top_link").stop().animate( { left: "-240px" }, 100, 'easeOutExpo' );
			$("#total_m_lay").stop().animate( { left: "-240px" }, 100, 'easeOutExpo' );
			$(".wra_box").stop().animate( { left: "0" }, 100, 'easeOutExpo', function() {
				$("#container").removeClass("wra_box");
				$(".fix_bg").hide();
				$("#footer_outer").show();
				//$("#header").css('position','fixed');
			});
			return false;
		});
		return false;
	});

	//스크롤 상단 고정
	//$(window).scroll(function () {
	//	var headBox = $('#header');
	//	if($(document).scrollTop()>40){ 
	//		headBox.addClass('fix'); 
	//	}else {
	//		headBox.removeClass('fix'); 
	//	}
	//});
	

});
