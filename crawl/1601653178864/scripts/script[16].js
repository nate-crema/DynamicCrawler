/*

Base URL: /resource/templete/nl/js/main.js || Script sequence: [16]

*/

$(window).on("load", function () {
    /*
    $(window).on("scroll", function () {
        var $BookScroll = $(".main_book");
        if (
            $(window).scrollTop() + $(window).height() / 2 + 360 >
            $BookScroll.offset().top
        ) {
            $BookScroll.addClass("active");
        } else {
            $BookScroll.removeClass("active");
        }
    });
    */
    /**
     * 스와이프 배너
     */
    /**
     * 소식알람
     */
    var informSwiper = $(".inform_wrap .swipe_list");
    informSwiper.bxSlider({
        mode: "horizontal", // 가로 방향 수평 슬라이드
        speed: 1000, // 이동 속도를 설정
        pause:6000, // 멈추는 시간
        wrapperClass: "inform_frame",
        infiniteLoop: true, // 반복 설정
        hideControlOnEnd: false, //첫번째,마지막일경우 버튼 비활성화
        captions: false, //이미지 캡션 title속성
        touchEnabled: true, // 슬라이더 터치 스와이프 전환 허용
        pager: true, // 현재 위치 페이징 표시 여부 설정
        pagerType: "short", // 페이징 숫자
        pagerShortSeparator: "/", //페이징 분리 문자값 설정
        controls: true, // next,prev 컨트롤 추가
        nextText: '<span class="ir_text">다음(next)</span>',
        prevText: '<span class="ir_text">이전(previous)</span>',
        autoControls: true, // start/stop 컨트롤 추가
        startText: '<span class="ir_text">재생(start)</span>',
        stopText: '<span class="ir_text">정지(stop)</span>',
        autoControlsCombine: false,
        keyboardEnabled: false,
        auto: true, // 자동 실행 여부
        autoStart: true,
        ariaHidden: true,
        adaptiveHeight: true,
        onSliderLoad: function(){
        	$(".inform_wrap").addClass('visible');
        	//$(".bxslider-wrapper").css("visibility", "visible").animate({opacity:1});

        }

    });
    var informSwiperQty = informSwiper.getSlideCount();
    if (informSwiperQty === 1) informSwiper.destroySlider();
    $(".inform_wrap .bx-stop").on("click", function () {
        informSwiper.stopAuto();
        console.log($(this));
        $(this).removeClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-start").show();
    });
    $(".inform_wrap .bx-start").on("click", function () {
        informSwiper.startAuto();
        console.log($(this));
        $(this).addClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-stop").show();
    });
    //$(".inform_wrap .bx-stop").hide();

    /**
     * 디지털컬렉션
     */
    var collectionSwiper = $(".collection_wrap .swipe_list");
    collectionSwiper.bxSlider({
        mode: "horizontal",
        speed: 2000,
        wrapperClass: "collection_frame",
        infiniteLoop: true,
        hideControlOnEnd: false,
        captions: false,
        touchEnabled: true,
        pager: true,
        preloadImages:"all",
        pagerType: "short",
        pagerShortSeparator: "/",
        controls: true,
        nextText: '<span class="ir_text">다음(next)</span>',
        prevText: '<span class="ir_text">이전(previous)</span>',
        autoControls: true,
        startText: '<span class="ir_text">재생(start)</span>',
        stopText: '<span class="ir_text">정지(stop)</span>',
        autoControlsCombine: false,
        keyboardEnabled: false,
        auto: true,
        autoStart: false,
        randomStart: true,
        ariaHidden: true,
        adaptiveHeight: true,
        onSliderLoad: function(){
        	$(".collection_wrap").addClass('visible');
        	//$(".bxslider-wrapper").css("visibility", "visible").animate({opacity:1});

        }
    });
    var collectionSwiperQty = collectionSwiper.getSlideCount();
    if (collectionSwiperQty === 1) collectionSwiper.destroySlider();
    $(".collection_wrap .bx-stop").on("click", function () {
        collectionSwiper.stopAuto();
        $(this).removeClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-start").show();
    });
    $(".collection_wrap .bx-start").on("click", function () {
        collectionSwiper.startAuto();
        $(this).addClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-stop").show();
    });
    $(".collection_wrap .bx-stop").click();
    //$(".collection_wrap .bx-stop").hide();

    /**
     * 신청 참여    */
    var participationSwiper = $(".participation_wrap .swipe_list");
    participationSwiper.bxSlider({
        mode: "horizontal",
        speed: 1000,
        wrapperClass: "collection_frame",
        infiniteLoop: true,
        hideControlOnEnd: false,
        captions: false,
        touchEnabled: true,
        pager: true,
        preloadImages:"all",
        pagerType: "short",
        pagerShortSeparator: "/",
        controls: true,
        nextText: '<span class="ir_text">다음(next)</span>',
        prevText: '<span class="ir_text">이전(previous)</span>',
        autoControls: true,
        startText: '<span class="ir_text">재생(start)</span>',
        stopText: '<span class="ir_text">정지(stop)</span>',
        autoControlsCombine: false,
        keyboardEnabled: false,
        auto: true,
        autoStart: false,
        randomStart: true,
        ariaHidden: true,
        adaptiveHeight: true,
        onSliderLoad: function(){
        	$(".participation_wrap").addClass('visible');
        	//$(".bxslider-wrapper").css("visibility", "visible").animate({opacity:1});
        }

    });
    var participationSwiperQty = participationSwiper.getSlideCount();
    if (participationSwiperQty === 1) participationSwiper.destroySlider();
    $(".participation_wrap .bx-stop").on("click", function () {
        participationSwiper.stopAuto();
        $(this).removeClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-start").show();
    });
    $(".participation_wrap .bx-start").on("click", function () {
        participationSwiper.startAuto();
        $(this).addClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-stop").show();
    });
    $(".participation_wrap .bx-stop").click();
    //$(".participation_wrap .bx-stop").hide();

    /**
     * 외부기관 홍보배너
     */
    /*
    var sitePromotionSwiper = $(".site_promotion_wrap .site_promotion_list");
    sitePromotionSwiper.bxSlider({
        mode: "horizontal",
        speed: 500,
        wrapperClass: "site_promotion",
        infiniteLoop: true,
        hideControlOnEnd: false,
        controls: true,
        captions: false,
        touchEnabled: true,
        nextText: '<span class="ir_text">다음(next)</span>',
        prevText: '<span class="ir_text">이전(previous)</span>',
        autoControls: true,
        startText: '<span class="ir_text">재생(start)</span>',
        stopText: '<span class="ir_text">정지(stop)</span>',
        autoControlsCombine: false,
        keyboardEnabled: true,
        auto: true,
        autoStart: true,
        ariaHidden: true,
        adaptiveHeight: true,

    });
    var sitePromotionSwiperQty = sitePromotionSwiper.getSlideCount();
    if (sitePromotionSwiperQty === 2) sitePromotionSwiper.destroySlider();
    $(".site_promotion_wrap .bx-stop").on("click", function () {
        sitePromotionSwiper.stopAuto();
        $(this).removeClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-start").show();
    });
    $(".site_promotion_wrap .bx-start").on("click", function () {
        sitePromotionSwiper.startAuto();
        $(this).addClass("active");
        $(this).hide();
        $(this).closest(".bx-controls-auto").find(".bx-stop").show();
    });
    */
    //$(".site_promotion_wrap .bx-stop").hide();

    /**
     * 도서 영역
     */
    var mainBookSlickOptions = {
        slidesToShow: 5, // 한 화면에 보여줄 아이템수
        slidesToScroll: 1, // 한번에 슬라이드 시킬 아이템 개수
        prevArrow: '<button type="button" class="slick-arrow slick-prev">이전</button>',
        nextArrow: '<button type="button" class="slick-arrow slick-next">다음</button>',
        arrows: false,
        infinite: true, // 반복
        controls: true,
        pauseOnHover: true, //슬라이드 시 마우스 오버 위의 제어
        swipe: false,
        responsive: [
            {
                breakpoint: 1239,
                settings: {
                    slidesToShow: 4,
                    arrows: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    swipe: true,
                    arrows: true,
                    mobileFirst: true
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe: true,
                    arrows: true,
                    mobileFirst: true
                }
            }
        ]
    };

    var $mainBookSlick = $(".book_swipe_list").slick(mainBookSlickOptions);

    var tab1 = new Tabs(".main_notice_wrap", { initialIndex: 0 });
    var tab2 = new Tabs(".main_news_wrap", { initialIndex: 0 });
    var tab3 = new Tabs(".main_book", {
        initialIndex: 0,
        tabListClassName: ".book_menu_wrap",
        tabItemClassName: ".book_item",
        tabPanelWrapClassName: ".book_contents_wrap",
        tabPanelClassName: ".book_contents",
        beforeTabActive: function (index) {
            $mainBookSlick.eq(index).slick('unslick');
        },
        afterTabActive: function (index) {
            $mainBookSlick.eq(index).slick(mainBookSlickOptions);
        },
    });

    /** 외부기관 홍보배너 */
    var sitePromotionOptions = {
        slidesToShow: 2, // 한 화면에 보여줄 아이템수
        slidesToScroll: 1, // 한번에 슬라이드 시킬 아이템 개수
        prevArrow: '<button type="button" class="slick-arrow slick-prev">이전</button>',
        nextArrow: '<button type="button" class="slick-arrow slick-next">다음</button>',
        arrows: true, //좌우 화살 버튼 노출 여부
        infinite: true, // 반복
        pauseOnHover: true, //슬라이드 시 마우스 오버 위의 제어
        swipe: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    swipe: true,
                    mobileFirst: true,
                    variableWidth: true
                }
            }
        ]
    };
    var $sitePromotionOptions = $(".site_promotion_list").slick(sitePromotionOptions);
    $('.btn_stop').show();
    $('.btn_stop').on('click', function() {
        $('.btn_stop').hide();
        $('.btn_start').show();
        $('.site_promotion_list').slick('slickPause');
    });

    $('.btn_start').on('click', function() {
        $('.btn_start').hide();
        $('.btn_stop').show();
        $('.site_promotion_list').slick('slickPlay');
    });

    $(".icon_link").hover(function(){
    	console.log($(this).children(".icon_non_hover"));
    	$(this).find(".icon_non_hover").hide();
    	$(this).find(".icon_hover").show();
    },function(){
    	$(this).find(".icon_non_hover").show();
    	$(this).find(".icon_hover").hide();
    });



    $('.book_list > li:first-child > a').addClass('on');
    $('.book_list > li > a').removeAttr('disabled');
    $('.book_item > a').click(function(){
       var index = $(".book_item > a").index(this);
       if($(this).hasClass('on')){
          if(index=="0"){location.href='/NL/contents/N10302000000.do?schM=list';}
          else if(index=="1"){location.href='/NL/contents/N20500000000.do?schM=list';}
          else if(index=="2"){location.href='/NL/contents/N20600000000.do?schM=list';}
          else if(index=="3"){location.href='/NL/contents/N10401000000.do?schM=list';}

       }else{
          $(this).closest('ul').find('a').removeClass('on');
          $(this).addClass('on')
       };
    });

});
