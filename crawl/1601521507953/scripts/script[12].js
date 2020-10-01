/*

Base URL: /js/common.js?v=181121_1 || Script sequence: [12]

*/// Scroll Move by sketchbooks.co.kr
function scrollMove(t,h){
	if(h==undefined) h=0;
	jQuery('html,body').animate({scrollTop:jQuery(t).offset().top-h});
}

// Menu Open
function menuOpen(o){
	$('#'+o).show(0,function(){
		$('body').addClass('nav_open '+o+'_open');
	});
}

// Menu Close
function menuClose(){
	$('body').removeClass('nav_open snb_open mypage_open');
	setTimeout(function(){
		$('div.side_nav').hide();
	},500);
}

// Menu Move
function goMenu(page, gwan){
	$("#gwan").val(gwan);
	$("#goMenu").attr("action", page).submit();
}


//  바로 대출 sso 연결
function baroloan(userId){
	var ssoUrl = "https://lib.ansan.go.kr/baro/homepage/baroloanssologin.do";
	var param = "_cu";
	var key = makeRandom(1111, 9999);
	param += key;
	param += unescape(encodeURIComponent(userId));
	param += "cni_";
	ssoUrl += "?userid=" + unescape(userId);
	ssoUrl += "&key=" + key;
	ssoUrl += "&token=" + MD5(param);
	window.open(ssoUrl, "_blank");
}

// 랜덤 난수 생성기
function makeRandom(min, max){
	var ranVal = Math.random() * (max-min) + min;
	return Math.floor(ranVal);
}

// LibraryWay Move
function goLibraryWay(key){
	$("#sitekey10").val(key);
	$("#goLibraryWay").attr("action", "libraryway.do").submit();
}


// 화면크기
	var nowZoom = 100;
	function zoomIn() {
		nowZoom = nowZoom - 5;
		if(nowZoom <= 70) nowZoom = 70;
		zooms("Y");
		//쿠키 등록
	//	$.cookie("kipiZoom",nowZoom,{expires:365});
	}
	function zoomOut() {
		nowZoom = nowZoom + 5;
		if(nowZoom >= 500) nowZoom = 500;
		zooms("Y");
	//	$.cookie("kipiZoom",nowZoom,{expires:365});
	}
	function zoomReset(){
		nowZoom = 100; 
		zooms();
	//	$.cookie("kipiZoom",nowZoom,{expires:365});
	}
	function zooms(alertYN){
		var nowZoomMoz = "0."+nowZoom;
		var zoomsAlertYN = alertYN;
		if(zoomsAlertYN == "" || zoomsAlertYN == null ||zoomsAlertYN == "null" || zoomsAlertYN == undefined){
			zoomsAlertYN = false;
		}else{
			zoomsAlertYN = true;
		}
		if(nowZoom >= 100){
			nowZoomMoz = String(nowZoom).substring(0,1)+"."+String(nowZoom).substring(1,nowZoom.length);
		}
		$("body").css({
			//MSIE (확대)
			zoom : nowZoom+"%",
			//webkit (크롬,사파리 확대 후 -위치 0,0 으로 초기화)
			"-webkit-transform":"scale("+nowZoomMoz+")",
			"-webkit-transform-origin":"0 0",
			//FF (파이어폭스 확대 후 위치 0,0 으로 초기화
			"-moz-transform" : "scale("+nowZoomMoz+")",
			"-moz-transform-origin":"0 0",
			//O (오페라 확대 후 위치 0,0 으로 초기화
			"-o-transform":"scale("+nowZoomMoz+")",
			"-o-transform-origin":"0 0"
		});
		
		if(zoomsAlertYN){
			zommsAlert();
		}
	}
	function zommsAlert(){
		if(nowZoom==70){
			alert ("30%축소 되었습니다. 더 이상 축소할 수 없습니다.");
		}
		if(nowZoom==500){
			alert ("500%확대 되었습니다. 더 이상 확대할 수 없습니다.");
		}
	};

jQuery(function($){
/*
	var gnb = $('#gnb');
	var gLi = gnb.find('li');
	function gnbToggle(){
		var t = $(this);
		var n = t.nextAll('div');
		if(n.is(':hidden') || n.length==0) {
			t.parent().parent().find('>li>div').hide();
			n.slideDown(150) 
		}
	};
	function gnbOut(){
		$(this).find('>div').hide();
	};
	gLi.find('>a').mouseover(gnbToggle).focus(gnbToggle);
	gLi.mouseleave(gnbOut);
	gnb.find('>li:last-child a:last').blur(function(){
		$(this).parents('div').hide()
	});
*/

// GNB
	var gnb = $('#gnb');
	gnb.hover(function(){
		$("#hd").addClass('open');
	},function(){
		$("#hd").removeClass('open');
	});
	$("#gnb a").focus(function(){
		$("#hd").addClass('open');
	});
	$("#gnb a").blur(function(){
		$("#hd").removeClass('open');
	});

// Toggle
	$('[data-toggle]').click(function(){
		$(this).toggleClass('on');
		$($(this).attr('data-target')).toggle();
	});
	function tabTg(){
		$('ul.tab_tg>li>a.on').each(function(){
			var n = $(this).next();
			n.imagesLoaded(function(){
				n.show().parents('.tab_tg_horizon').css('height',n.height()+40);
			});
		});
	}
	tabTg();
	$(window).resize(tabTg);
	$('ul.tab_tg>li>a').click(function(){
		$(this).addClass('on').parent().siblings().find('>a.on').removeClass('on').next().hide();
		tabTg();
		return false;
	});

// Accordion
	$('.accordion .q > a').click(function(){
		var btn = $(this);
		$(this).parent().next('.a').slideToggle(250, function(){
			console.log();
			if( $(this).css('display') == 'block' ){
				btn.text("닫기");
			}else{
				btn.text("열기");
			}
		}).parent('li').toggleClass('open').siblings().removeClass('open').find('>.a').slideUp(250);

		return false;
	});

// Slide
	var slider1 = $('ul.bxslider1').bxSlider({
		speed:1000,
		autoHover:true,
		auto:true,
		autoControls:true,
		pause:4000,
		pager:false,
		onSliderLoad: function(){
			$('.bx-clone').attr('aria-hidden', 'true');
			//removes focusability from all child elements of .bx-clone so that the tab         key doesn�셳 disrupt the slider
			$('.bx-clone *').attr('tabindex', '-1');

			//removes focusability from all children of slides that are not the current         slide
			$('.p_slider').not('.current').find('*').attr('tabindex', '-1');
			$('.current').find('a').attr('tabindex', '0');
		},
		onSlideBefore: function(){
			//removes class of current from all slides
			$('.p_slider').removeClass('current');

			//adds class of current to the new current slide
			current = slider1.getCurrentSlide();
			slider1.goToSlide(current);

			//removes focusability from all children of slides that are not the current         slide
			$('.p_slider').not('.current').find('*').attr('tabindex', '-1');
			$('.p_slider.current').find('a').attr('tabindex', '0');
			$('.p_slider:not(.bx-clone)').eq(current).addClass('current');	
		},
		onSlideAfter: function(){
			//removes focusability from all children of slides that are not the current         slide
			$('.p_slider').not('.current').find('*').attr('tabindex', '-1');
			$('.p_slider.current').find('a').attr('tabindex', '0');
		}
	});

	var slider2 = $('ul.bxslider2').bxSlider({
		speed:1000,
		pager:false,
		autoHover:true,
		auto:true,
		autoControls:true,
		pause:4000,
		onSliderLoad: function(){
			$('.bx-clone').attr('aria-hidden', 'true');
			//removes focusability from all child elements of .bx-clone so that the tab         key doesn�셳 disrupt the slider
			$('.bx-clone *').attr('tabindex', '-1');

			//removes focusability from all children of slides that are not the current         slide
			$('.p2_slider').not('.current').find('*').attr('tabindex', '-1');
			$('.current').find('a').attr('tabindex', '0');
		},
		onSlideBefore: function(){
			//removes class of current from all slides
			$('.p2_slider').removeClass('current');

			//adds class of current to the new current slide
			current = slider2.getCurrentSlide();
			slider2.goToSlide(current);

			//removes focusability from all children of slides that are not the current         slide
			$('.p2_slider').not('.current').find('*').attr('tabindex', '-1');
			$('.p2_slider.current').find('a').attr('tabindex', '0');
			$('.p2_slider:not(.bx-clone)').eq(current).addClass('current');	
		},
		onSlideAfter: function(){
			//removes focusability from all children of slides that are not the current         slide
			$('.p2_slider').not('.current').find('*').attr('tabindex', '-1');
			$('.p2_slider.current').find('a').attr('tabindex', '0');
		}
	});

	// Mobile
	$('#wrap').append('<button type="button" id="sidebar_tg" onclick="menuClose();"><b class="blind">Close</b></button>');
});