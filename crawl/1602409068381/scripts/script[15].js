/*

Base URL: /resource/templete/nl/js/common.js || Script sequence: [15]

*/

$(function () {
	$(document).click(function(e){
		if(!$('.btn_arrow').is(e.target) && !$('.arrow_fold').is(e.target)){
			$('.autocomplete_layer').removeClass('is_expanded');
			$('.btn_arrow').removeClass('is_fold');
			$('.arrow_fold').text('자동 완성 열기');
		}
	});
    var $container = $('.content_info'),
    $isMenuWrap = $container.children().hasClass('menu-wrap');
    if($isMenuWrap){
      var depth4MenuSwiper = $(".menu-wrap .depth4-menu__list");
      var selectedIndex = depth4MenuSwiper.find(".is_selected").index();
      depth4MenuSwiper.bxSlider({
          wrapperClass:'depth4_frame',
          hideControlOnEnd: true,
          controls: true,
          maxSlides:5,
          moveSlides:1,
          slideWidth:183,
          nextText: '<span class="ir_text">다음(next)</span>',
          prevText: '<span class="ir_text">이전(previous)</span>',
          keyboardEnabled: true,
          ariaHidden: true,
          adaptiveHeight: true,
          pager :false,
          infiniteLoop :true,
          hideControlOnEnd : true
      });
      var depth4MenuSwiperQty = depth4MenuSwiper.getSlideCount();
      if (depth4MenuSwiperQty < 6) depth4MenuSwiper.destroySlider();
      else if(selectedIndex != -1) depth4MenuSwiper.goToSlide(selectedIndex);
    }
});


/** mobile 3,4depth swiper */
$(function() {
	var sel4Index = $(".menu-wrap--mobile .depth4-menu__list .is_selected").index();
	var sel5Index = $(".menu-wrap--mobile .depth5-menu__list .is_selected").index();
    var depth4MenuWrap = $('.menu-wrap--mobile .depth4-menu__list').bxSlider({
        autoControls:true,
        controls:false,
        slideWidth: 'auto',
        pager:false,
        wrapperClass:'depth4-menu__frame',
        maxSlides:3,
        //infiniteLoop:true,
        infiniteLoop: false,
        preloadeImages:'all'
    });
    var depth5MenuWrap = $('.menu-wrap--mobile .depth5-menu__list').bxSlider({
        autoControls:true,
        controls:false,
        slideWidth: 'auto',
        pager:false,
        wrapperClass:'depth5-menu__frame',
        infiniteLoop: false,
        preloadeImages:'all'
    });
    if(sel4Index > 1) depth4MenuWrap.goToSlide(sel4Index-1);
    if(sel5Index > 1) depth5MenuWrap.goToSlide(sel5Index-1);
});

$(function() {
    $(".footer-site").on("click","button",function(){
        var isNotMobile = commons.getDeviceType() !== DEVICE_TYPE_MOBILE;
        if(isNotMobile){
            $(".footer-family__list").stop().fadeOut();
            $(".btn-family").removeClass("is_active");
            if($(this).next("ul").css("display") === "block"){
                $(this).next("ul").stop().fadeOut();
                $(this).removeClass("is_active");
            }else{
                $(this).next("ul").stop().fadeIn();
                $(".btn-family").removeClass("is_active");
                $(this).addClass("is_active");
            }
        }else{
            $(".footer-policy__list,.footer-family__list,.footer-banner__list").stop().fadeOut();
            $(".btn-policy,.btn-family,.btn-banner").removeClass("is_active");
            if($(this).next("ul").css("display") === "block"){
                $(this).next("ul").stop().fadeOut();
                $(this).removeClass("is_active");
            }else{
                $(this).next("ul").stop().fadeIn();
                $(".btn-policy,.btn-family,.btn-banner").removeClass("is_active");
                $(this).addClass("is_active");
            }
        }
    })

    $('.footer__inner-bottom').on("click",".site-go",function(e) {
        console.log($(this).attr('id'));
        var id = $(this).attr('id');
        var goSiteUrl = $('#'+id.replace('_btn','')).val();
        if (goSiteUrl=="") {
            alert("항목을 선택하세요.");
            return false;
        } else {
            window.open(goSiteUrl,'_blank');
        }
    });
});

/**
 * 글자크기
 */
$(function(){
	var fSize = 15; //font-size
	var lSize = 22; //line-height

	//zoom in
	$(".font_set_wrap .btn_fontdown").on("click", function(){
		if(fSize < 25){
			fSize++;
			lSize++;
			$(".content_wrap *").css("font-size", fSize+"px");
			$(".content_wrap *").css("line-height", lSize+"px");
			return false;
		} else {
			alert("최대 글자 크기입니다.");
			return false;
		}
	});

	//zoom out
	$(".font_set_wrap .btn_fontup").on("click", function(){
		if(fSize > 12){
			fSize--;
			lSize--;
			$(".content_wrap *").css("font-size", fSize+"px");
			$(".content_wrap *").css("line-height", lSize+"px");
			return false;
		} else{
			alert("최소 글자 크기입니다.");
			return false;
		}
	});
});

$(function(){
    var seemSize = 1,
        zoomSize = 1,
        browser = navigator.userAgent.toLowerCase();
    var $btnZoomout = $(".zoomout");
    var $btnZoomIn = $(".zoomin");

    function zoomIn(){
        seemSize += 0.05;
        zoomSize *= 1.2;
        zoom();
    }
    function zoomOut(){
        seemSize -= 0.05;
        zoomSize /= 1.2;
        zoom();
    }
    function zoom(){
        if (browser.indexOf("firefox") != -1) { //브라우저가 firefox일때
        document.body.style.webkitTransform =    'scale('+seemSize+')';
        document.body.style.webkitTransformOrigin = '50% 0 0'; //늘리고 줄였을때위치,
        document.body.style.msTransform =   'scale('+seemSize+')';
        document.body.style.msTransformOrigin = '50% 0 0';
        document.body.style.transform = 'scale('+seemSize+')';
        document.body.style.transformOrigin='50% 0 0';
        document.body.style.OTransform = 'scale('+seemSize+')';
        document.body.style.OTransformOrigin='50% 0 0';
        }else{
        document.body.style.zoom = zoomSize;
        }
    }
    $btnZoomout.on('click', zoomOut);
    $btnZoomIn.on('click', zoomIn);
  });


$(function(){

    $('.fixed_btn_wrap').on('click','a', function(e){
        e.stopPropagation();
        e.preventDefault();
        $('html, body').animate({
            "scrollTop": 0
        }, 200);
    });

    // input label
    $('.input_text_wrap,.textarea_wrap,.input-text-wrap').each(function () {
        var $this = $(this);
        var $field = $this.find('[type=text], [type=file], [type=email], [type=password], textarea');
        var $label = $(this).find('label');

        var fadeText = function () {
            if ($.trim($field.val()) == '') {
                $field.val('');
                $label.fadeIn(100);

            } else {
                if ($field.prop('type') == 'file') {
                    $label.text($field.val());
                } else {
                    $label.fadeTo(100, 0);
                }
            }
        };
        $field.on('focusin change', function () {
            $label.fadeOut(100);
        })
        $field.on('focusout', function () {
            fadeText();
        });
    });


    //sns 공유하기 애니메이션
	$(".menu__set-share").click(function(e){
        e.preventDefault();
        var $target = $(e.currentTarget).parents('.menu__set').find('.menu-sns');
        var isCollapsed = $target.hasClass('is_sns_opened');

        if(isCollapsed) {
            $target.removeClass('is_sns_opened');
            $target.find('.my_welfare_info').stop().slideDown(function () {
              $(this).removeAttr('style');
            });
            $target.attr("aria-label","SNS 공유하기 축소됨");
        } else {
            $target.addClass('is_sns_opened');
            $target.find('.my_welfare_info').stop().slideUp(function () {
              $(this).attr('style', 'display:none');
            });
            $target.attr("aria-label","SNS 공유하기 확장됨");
        }
    })
    $(".menu-sns_close").click(function(){
        $(this).parents('.menu__set').find('.menu-sns').removeClass("is_sns_opened");
        $(this).parents('.menu__set').attr("aria-label","SNS 공유하기 축소됨");
    });



    //데이트피커
    $(".input_text.date").datepicker();

    //게시판 공통 유틸박스
    $(".btn_board_util").click(function(){
        $(this).next(".board_util_menu").fadeToggle();
    })

    //모바일 첨부파일
    $(window).resize(function() {
        var isNotMobile = commons.getDeviceType() !== DEVICE_TYPE_MOBILE;
        if(isNotMobile){
            $(".board_file_list").show();
        }else{
            $(".board_file_list").hide();
        }
    })

    $(".btn_file").click(function(){
        $(this).next(".board_file_list").slideToggle();
        $(this).toggleClass("is_open");
        if($(this).hasClass("is_open")) {
        	$(this).attr("aria-expanded", "true");
        } else {
        	$(this).attr("aria-expanded", "false");
        }
    })


    var i = 0;
    //레이어팝업
    function lypop_open(){
        //$(".btn_layer").click(function(){
    	$(document).on("click",".btn_layer",function(){
            var layer = $(this).attr("data-layer");
            $(".layer_popup_wrap"+ "[data-layer='" + layer + "']").fadeIn();
            $(".layer_popup_wrap"+ "[data-layer='" + layer + "'] .detail_layer_popup").attr({'aria-hidden':'false', 'tabindex':'0'}).focus();
            $(".layer_popup_wrap"+ "[data-layer='" + layer + "'] .popup_contents").attr('tabindex','0');

            $("body").addClass("no_scroll");

            if(layer == "info_img_pop"){//자료이용하는곳 레이어
            	var imgSrc = $(this).attr("data-img-src");
            	$('div.info_img_pop div.popup_contents img').attr("src",imgSrc);
            }

            //웹 접근성 관련 속성 추가
            /*$(".layer_popup_wrap"+ "[data-layer='" + layer + "']").siblings().attr('aria-hidden','true');
            $("body > *").not(".container").attr('aria-hidden','true');
            $(".content_top, .lnb").attr('aria-hidden','true');
            $(".layer_popup_wrap"+ "[data-layer='" + layer + "']").find('.layer_popup').attr('aria-hidden','false').focus();

        	$('.popup_contents').attr('data-focus-next','layer_close'+i);
        	$('.layer_popup .popup_header .btn_close').attr('data-focus','layer_close'+(i++));*/
            $(this).attr("data-focus",layer+i);

            $("body > *").not(".container").attr('aria-hidden','true')
            $(".content_top, .lnb, .appraisal").attr('aria-hidden','true');
        });
    	return false;
    }
    function lypop_close(){
        //$(".layer_popup_wrap .btn_close,.layer_popup_wrap .btn_full_close,.layer_popup_wrap .btn_cancel").click(function(){
    	$(".layer_popup_wrap .btn_close, .layer_popup_wrap .btn_full_close, .layer_popup_wrap .btn_cancel").on("click",function(){
            $("body").removeClass("no_scroll");
            var focus_item = $(this).parents(".layer_popup_wrap").attr('data-layer');
            //$(this).parents(".layer_popup_wrap").fadeOut();
            //$(this).parents(".layer_popup_wrap").find('.popup_contents').attr('tabindex','-1');
            $(this).closest(".layer_popup_wrap").fadeOut();
            $(this).closest(".layer_popup_wrap").find('.popup_contents').attr('tabindex','-1');
            if(focus_item.length == 1) $(".btn_layer"+ "[data-layer='" + focus_item + "']").focus();



            //웹 접근성 관련 속성 추가
            $(this).closest(".layer_popup_wrap").attr('aria-hidden','true');
            $("body > *").not(".container").attr('aria-hidden','false');
            $(".content_top, .lnb, .appraisal").attr('aria-hidden','false');

            var focus_next = focus_item+i;
            $("[data-focus="+focus_next+"]").focus();
        });
    	return false;
    }
    lypop_open();
    lypop_close();

    $('#skip a[href="#sub_content"]').click(function(){
        var sub_cont = $('#sub_content').offset().top;
        $('html,body').animate({'scrollTop':sub_cont-200},10);
        $('#sub_content').focus();
    })

    /* tab_category_wrap */
	$('.tab_category_wrap').each(function (i, e){
		var panel_height = $(this).find('.is_active').children('.tabpanel').outerHeight();
		$(this).find('.tab_category_list').css({'height' : panel_height});
	});

    var panel_height2 = $('.tab_category_wrap2 .is_active').children('.tabpanel').outerHeight();
    $('.tab_category_wrap2 .tab_category_list').css({'height' : panel_height2});
    $('.tab_category_wrap .tab_item').children('button').click(function(){
        $('.tab_category_wrap .tab_item button').css({'opacity':'1'});
        $(this).parents('.tab_category_wrap').find('.tab_item').removeClass('is_active')
        $(this).parents('.tab_category_wrap').find('.tabpanel').hide(function(){
            $(this).removeAttr('tabindex');
        });
        $(this).parent('.tab_item').addClass('is_active');
        $(this).next('.tabpanel').show(function(){
            $(this).attr('tabindex','0');
        });
		$('.tab_category_wrap').each(function (i, e){
			var panel_height = $(this).find('.is_active').children('.tabpanel').outerHeight();
			$(this).find('.tab_category_list').css({'height' : panel_height});
		});
        var panel_height2 = $('.tab_category_wrap2 .is_active').children('.tabpanel').outerHeight();
        $('.tab_category_wrap2 .tab_category_list').css({'height' : panel_height2});
    })
    $('.tab_category_wrap .label').click(function(){
        $(this).parent('div').next('.tab_category_list').find('.tab_item button').animate({'opacity':'1', 'z-index':'1'}, 0, function(){
            $('.tab_category_wrap .tab_item button').click(function(){
		        if($(window).width() < 768) $('.tab_category_wrap .tab_item button').css({'opacity':'0','z-index':'-1'});
                var panel_label = $(this).text();
                $(this).parents('ul').prev('div').children('.label').text(panel_label);
            })
        });
    })
    $(window).resize(function() {
		$('.tab_category_wrap').each(function (i, e){
			var panel_height = $(this).find('.is_active').children('.tabpanel').outerHeight();
			$(this).find('.tab_category_list').css({'height' : panel_height});
		});
        var panel_height2 = $('.tab_category_wrap2 .is_active').children('.tabpanel').outerHeight();
        $('.tab_category_wrap2 .tab_category_list').css({'height' : panel_height2});
        $('.tab_category_wrap .tab_item').children('button').click(function(){
            $(this).parents('.tab_category_wrap').find('.tab_item').removeClass('is_active')
            $(this).parents('.tab_category_wrap').find('.tabpanel').hide(function(){
                $(this).removeAttr('tabindex');
            });
            $(this).parent('.tab_item').addClass('is_active');
            $(this).next('.tabpanel').show(function(){
                $(this).attr('tabindex','0');
            });

			$('.tab_category_wrap').each(function (i, e){
				var panel_height = $(this).find('.is_active').children('.tabpanel').outerHeight();
				$(this).find('.tab_category_list').css({'height' : panel_height});
			});
            var panel_height2 = $('.tab_category_wrap2 .is_active').children('.tabpanel').outerHeight();
            $('.tab_category_wrap2 .tab_category_list').css({'height' : panel_height2});
        });
        if($(window).width() > 767){
            $('.tab_category_wrap .tab_item button').removeAttr('style');
        }
    })
});
$(window).scroll(function(){
    //top button
    var headerHeight = 319;
    var scrollTop = $(document).scrollTop();
    if(scrollTop > headerHeight){
        $('.fixed_btn_wrap').css({
            'position':'fixed',
            'opacity':'1',
        });
    }else{
        $('.fixed_btn_wrap').css({
            'position':'fixed',
            'opacity':'0'
        });
    }
    $('a[href^="tel:"]').on('click', function(e)
    {
        if(/Chrome\/|Mobile( Safari)?\/|Opera M(in|ob)i\/|w(eb)?OSBrowser\/|Mobile\;|Tablet\;/.test(navigator.userAgent)){
            return
        }else{
            e.preventDefault();
            alert('이 브라우저에서는 전화연결을 지원하지 않습니다.');
            return false();
        };

    });
});


$(function(){
  //퀵메뉴
    $(".btn-detail-search").on("click", function(){
        if($(this).hasClass('is-open')){
            $(this).removeClass('is-open');
            $(this).attr('data-focus','');
            $(".detail-seachbox").removeAttr("tabindex").hide();
            $(".btn-detail-search").focus();
            $(".btn-detail-search").html('QUICK'+"&nbsp;"+'MENU').css('right','-42px');
        }else{
            $(this).addClass('is-open');
            $(this).attr('data-focus','quick_close');

            $(".detail-seachbox").attr("tabindex", "0").show().focus().css({position:'absolute',top:-115,right:0});
            $(".btn-detail-search").text('').append('<span>닫<br />기<br /></span>').css('right','85px');
        };
    });
});



$(function(){
	//사이트맵 view all
  $(".sitemap_view_all").on("click", function(){
      if($(this).hasClass('is-open')){
          $(this).removeClass('is-open');
          $(this).removeClass('on');
          $(".sitemap_2depth").removeAttr("tabindex").hide();
          $(".sitemap_view_all").focus();
          $(".sitemap_view_all").html('사이트맵 전체보기');
          $(".sitemap_1depth_title").children('.close').hide();
          $(".sitemap_1depth_title").children('.open').show();
          $(".sitemap_1depth_title").removeClass('is-open');
      }else{
          $(this).addClass('is-open');
          $(this).addClass('on');
          $(".sitemap_2depth").attr("tabindex", "0").show().focus();
          $(".sitemap_view_all").text('').append('<span>사이트맵 전체닫기</span>');
          $(".sitemap_1depth_title").addClass('is-open');
          $(".sitemap_1depth_title").children('.close').show();
          $(".sitemap_1depth_title").children('.open').hide();
      };
  });
  //사이트맵 1depth
    $(".sitemap_1depth_title").on("click", function(){
        if($(this).hasClass('is-open')){
            $(this).removeClass('is-open');
            $(this).children('.close').hide();
            $(this).children('.open').show();
            $(this).next(".sitemap_2depth").removeAttr("tabindex").hide();
            $(this).focus();
        }else{
            $(this).addClass('is-open');
            $(this).children('.open').hide();
            $(this).children('.close').show();
            $(this).next(".sitemap_2depth").attr("tabindex", "0").show().focus();
            };
        });
  });

$(function(){
	// 바구니 중앙도서관
	$(".category_info_wrap .list_tit_wrap .list_tit_wrap__tap").on("click", function(){
		if($(this).hasClass('is-open')){
			$(this).removeClass('is-open').text('내용열기').css({"background":"url(/resource/templete/nl/common/img/common/bottom-arrow.png) no-repeat right center"});
			$(".category_info_wrap .tabpanel_wrap").hide();
		}else{
			$(this).addClass('is-open').text('내용닫기').css({"background":"url(/resource/templete/nl/common/img/common/top-arrow.png) no-repeat right center"});
			$(".category_info_wrap .tabpanel_wrap").show();
		}
	});
});

$(function(){
	// 바구니 중앙도서관
	$(".basket_list .all-close").click(function(){
		$(".basket_list .all-close").addClass("add");
		$(".basket_list .all-close").removeClass("on");
		$(".basket_list .all-open").addClass("on");
	});

	$(".basket_list .all-open").click(function(){
		$(this).removeClass("on");
		$(".basket_list .all-close").addClass("on");
	});
});

$(function(){
	// 사서에게 물어보세요 질문하기
	$(".knowledge_Information .list_tit_wrap__tap").on("click", function(){
		if($(this).hasClass('is-open')){
			$(this).removeClass('is-open').text('내용열기').css({"background":"url(/resource/templete/nl/common/img/common/bottom-arrow.png) no-repeat right center"});
			$(".knowledge_Information .search_notice").hide();
			$(".knowledge_Information .list_tit_wrap").css({"border":"1px solid #dcdcdc"});
		}else{
			$(this).addClass('is-open').text('내용닫기').css({"background":"url(/resource/templete/nl/common/img/common/top-arrow.png) no-repeat right center"});
			$(".knowledge_Information .search_notice").show();
			$(".knowledge_Information .list_tit_wrap").css({"border-bottom":"transparent"});
		}
	});
});

$(function(){
	// 사서에게 물어보세요 질문하기
	$(".information_use__tap").on("click", function(){
		if($(this).hasClass('is-open')){
		    if($(window).width() < 767) {
		    	$(this).removeClass('is-open')
		    	.text('')
		    	.css({"background":"url(/resource/templete/nl/common/img/common/bottom-arrow.png) no-repeat right center","width":"15px","height":"15px"});
		    }else{
		    	$(this).removeClass('is-open').text('내용열기').css({"background":"url(/resource/templete/nl/common/img/common/bottom-arrow.png) no-repeat right center"});
		    }
			$(".condition_search_wrap .information_use__wrap").hide();
			$(".condition_search_wrap .information_use .title").css({"border-bottom":"none"});
		}else{
			if($(window).width() < 767) {
				$(this)
				.addClass('is-open')
				.text('')
				.css({"background":"url(/resource/templete/nl/common/img/common/top-arrow.png) no-repeat right center","width":"15px","height":"15px"});
			}else{
				$(this)
				.addClass('is-open')
				.text('내용닫기')
				.css({"background":"url(/resource/templete/nl/common/img/common/top-arrow.png) no-repeat right center"});
			}
			$(".condition_search_wrap .information_use__wrap").show();
			$(".condition_search_wrap .information_use .title").css({"border":"none","border-bottom":"1px solid #dcdcdc"});
		}
	});
    if($(window).width() < 767) {
    	$(".information_use__tap").text('').css({"background":"url(/resource/templete/nl/common/img/common/top-arrow.png) no-repeat right center","width":"15px","height":"15px"});
    }
});

$(function(){
	// 관보검색 색인어 검색결과 없을시
	$('.gazette_board .chosun_indexwrap li:contains("색인어가 존재하지 않습니다.")').css("width","100%");
});

$(function(){
	// 사서에게 물어보세요 질문하기
	$(".category_info_wrap .tab_scroll").on("click", function(){
		if($(this).hasClass('is-open')){
			if($(window).width() > 767) {
				$(this).removeClass('is-open').text('내용열기').css({"background-image":"url(/resource/templete/nl/common/img/common/bottom-arrow.png)"});
			}else{
				$(this).removeClass('is-open').css({"background":"url(/resource/templete/nl/common/img/common/bottom-arrow.png) center 80% no-repeat","font-size":"0px","background-size":"30%"});
			}
			$(".tabpanel_wrap").hide();
			$(".category_info_wrap .tab_list").css({"border":"1px solid #dcdcdc"});
			}else{

			if($(window).width() > 767) {
				$(this).addClass('is-open').text('내용닫기').css({"background-image":"url(/resource/templete/nl/common/img/common/top-arrow.png)"});
			}else{
				$(this).addClass('is-open').css({"background":"url(/resource/templete/nl/common/img/common/top-arrow.png) center 80% no-repeat","font-size":"0px","background-size":"30%"});
			}
			$(".tabpanel_wrap").show();
			$(".category_info_wrap .tab_list").css({"border-bottom":"transparent"});
		}
	});
});

$(function(){
	//접근성 포커스 강제 이동
	$(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
		var next = $(e.target).attr('data-focus-next'),
		prev = $(e.target).attr('data-focus-prev'),
		target = next || prev || false;

		if(!target || e.keyCode != 9) {
			return;
		}

		if( (!e.shiftKey && !!next) || (e.shiftKey && !!prev) ) {
			if($('[data-focus="' + target + '"]').closest('#main_video').css('display') == 'none'){
				setTimeout(function(){
					$('[data-focus="footer"]').focus();
				}, 1);
			} else if($('[data-focus="' + target + '"]').closest('#category_service, #출판사').css('display') == 'none'){
				setTimeout(function(){
					$('[data-focus="focus"]').focus();
				}, 1);
			} else if($('[data-focus="' + target + '"]').closest('.language-contents-focus').css('display') == 'none'){
				setTimeout(function(){
					$('[data-focus="close"]').focus();
				}, 1);
			} else if($('[data-focus="' + target + '"]').closest('#book_webdb').css('display') == 'none'){
				setTimeout(function(){
					$('[data-focus="board01"]').focus();
				}, 1);
			} else if($('[data-focus="' + target + '"]').closest('#인재채용').css('display') == 'none'){
				setTimeout(function(){
					$('[data-focus="news01"]').focus();
				}, 1);
			} else {
				setTimeout(function(){
					$('[data-focus="' + target + '"]').focus();
				}, 1);
			}
		}
	});
});
$(document).ready(function() {
	$(".tab_item").click(function(){
		$(".tab_item").removeClass('on');
		$(".tab_item  .check-text").remove();
		if($(this).attr("data-selected") == "true"){
			$(".tab_item").removeClass('on');
			$(this).addClass('on');
			$(this).find(".txt").append('<span class="ir_text check-text">(선택됨)</span>');
		}else{
			$(".tab_item").removeClass('on');
			$(".tab_item  .check-text").remove();
		};
	});

	$(".is_fixed_hd").attr('id','content_gnb');
});