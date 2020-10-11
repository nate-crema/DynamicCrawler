/*

Base URL: /resource/templete/nl/js/layout.js || Script sequence: [14]

*/

"use strict";
$(function(){
    $(window).scroll(function(){  //스크롤하면 아래 코드 실행
      if ($(window).width() > 767){
          var num = $(this).scrollTop();  // 스크롤값
          if( num > $("#popupWin").outerHeight() + $("#header__inner-top").outerHeight() + $("#main_search").outerHeight()){  // 스크롤을 36이상 했을 때
            $(".header__inner-bottom").addClass("fixed_gnb");
          }else{
            $(".header__inner-bottom").removeClass("fixed_gnb");
          }
      }
    });
  });
/** 디바이스 타입 데스크탑 */
var DEVICE_TYPE_DESKTOP = "DEVICE_TYPE_DESKTOP";
/** 디바이스 타입 테블릿 */
var DEVICE_TYPE_TABLET = "DEVICE_TYPE_TABLET";
/** 디바이스 타입 모바일 */
var DEVICE_TYPE_MOBILE = "DEVICE_TYPE_MOBILE";

/** 데스크탑 최소값 null */
var DEVICE_MIN_POINT_DESKTOP = null;
/** 테블릿 최대값 1230 */
var DEVICE_MAX_POINT_TABLET = 1230;
/** 모바일 최대값 767 */
var DEVICE_MAX_POINT_MOBILE = 767;

/** 메인 페이지 전용 클래스네임 */
var PAGE_CLASS_MAIN = ".main";
/** 서브 페이지 전용 클래스네임 */
var PAGE_CLASS_SUB = ".sub";

/** 스크롤 막을 때 사용하는 클래스네임 */
var NO_SCROLL_CLASS_NAME = "no_scroll";
/** 숨김요소가 있을때 사용하는 클래스네임 */
var NO_VIEW_CLASS_NAME = "no_view";

/** 접근성을 위한 속성명 */
var A11Y = {
  EXPANDED: "aria-expanded"
};

/** 커스텀이벤트 네임스페이스 */
var EVENT = {
  ON_CHANGE_DOM_SIZE: "EVENT_ON_CHANGE_DOM_SIZE",
  EXPANDED_ALLMENU: "EVENT_EXPANDED_ALLMENU",
  COLLAPSED_ALLMENU: "EVENT_COLLAPSED_ALLMENU"
};

/** jQuery.Object window */
var $win = $(window);
/** jQuery.Object document */
var $doc = $(document);
/** jQuery.Object html */
var $html = $("html");

/** 글로벌 속성 */

var globalAttr = {
  /** 전체 스크롤이 막혀있는가? */
  isDisablScroll: false,
  /** 디바이스 타입? 데스크탑 || 테블릿 || 모바일 */
  deviceType: "",
  /** 페이지 타입? 메인 || 서브*/
  pageType: ""
};

/*************************************************************************************
 공통 기능 및 공통 설정을 위한 객체
**************************************************************************************/
var commons = {
  /**
   * 공통 설정
   */
  init: function() {
    this.reset();
    $win.on("resize.commons", $.proxy(this.reset, this));
  },
  /**
   * 사이즈가 변경될때 마다 기본설정값을 다시 세팅
   */
  reset: function() {
    this.setDeviceType();
    this.setPageType();
  },
  /**
   * 커스텀 이벤트 등록과 trigger 메소드 제공
   */
  event: (function() {
    var events = {};

    function forEachEmitFunction(functions, eventName, eventData) {
      for (var i = 0; i < functions.length; i++) {
        functions[i](eventData, eventName);
      }
    }

    return {
      /**
       * 이벤트 등록
       * @param {Strign} eventName 이벤트 이름
       * @param {Function} action 등록할 이벤트 핸들러
       */
      listener: function(eventName, action) {
        if (typeof action === "function") {
          if (events[eventName] === undefined) {
            events[eventName] = [];
          }

          events[eventName].push(action);
        }
      },
      /**
       * 이벤트 실행
       * @param {Strign} eventName 이벤트 이름
       * @param {Object} eventData 이벤트 데이터
       */
      trigger: function(eventName, eventData) {
        events[eventName] &&
          forEachEmitFunction(events[eventName], eventName, eventData);
      }
    };
  })(),
  /**
   * 현재 전체 스크롤이 비활성화되어 있는지 true/false를 반환한다.
   */
  getDisablScrollStat: function() {
    return globalAttr.isDisablScroll;
  },
  /**
   * 전체 스크롤을 활성화한다.
   */
  enabledScroll: function() {
    $html.removeClass(NO_SCROLL_CLASS_NAME);
    globalAttr.isDisablScroll = false;
  },
  /**
   * 전체 스크롤을 비활성화한다.
   */
  disabledScroll: function() {
    $html.addClass(NO_SCROLL_CLASS_NAME);
    globalAttr.isDisablScroll = true;
  },

  /**
   * 전체 숨김 활성화한다
   */
  enabledView: function() {
    $html.removeClass(NO_VIEW_CLASS_NAME);
  },
  /**
   * 전체 숨김 비활성화한다
   */
  disabledView: function() {
    $html.addClass(NO_VIEW_CLASS_NAME);
  },
  /**
   * 현재 디바이스 타입을 반환한다.
   * @return {String} DEVICE_TYPE_DESKTOP || DEVICE_TYPE_TABLET || DEVICE_TYPE_MOBILE
   */
  getDeviceType: function() {
    return globalAttr.deviceType;
  },
  /**
   * 디바이스 타입을 체크하여 모바일/테블릿/데스크탑 3가지로 구분하여 해당값을
   * globalAttr.deviceType에 저장한다.
   */
  setDeviceType: function() {
    var windowWidth = $win.outerWidth();

    if (windowWidth <= DEVICE_MAX_POINT_MOBILE) {
      globalAttr.deviceType = DEVICE_TYPE_MOBILE;
    } else if (windowWidth <= DEVICE_MAX_POINT_TABLET) {
      globalAttr.deviceType = DEVICE_TYPE_TABLET;
    } else {
      globalAttr.deviceType = DEVICE_TYPE_DESKTOP;
    }
  },
  /**
   * 현재 페이지 타입을 구한다.
   * @reutn {String} PAGE_CLASS_MAIN || PAGE_CLASS_SUB
   */
  getPageType: function() {
    return globalAttr.pageType;
  },
  /**
   * 현재 페이지 타입 설정 한다.
   * @return {String} PAGE_CLASS_MAIN || PAGE_CLASS_SUB
   */
  setPageType: function() {
    var hasMainClassName = $html.find(PAGE_CLASS_MAIN).length;

    globalAttr.pageType = hasMainClassName ? PAGE_CLASS_MAIN : PAGE_CLASS_SUB;
  }
};

/*************************************************************************************
 헤더 고정 스크립트
**************************************************************************************/
var stickyHeader = {
  init: function() {
    // 필요한 객체 선택
    this.$popupWin = $(".banner__notice-wrap");
    this.$container = $(".header-wrap");
    this.$header = this.$container.find(".header");
    this.$headsearch = $(".wide-search-wrap");
    this.$headerBottom = this.$container.find(".header__inner-bottom");
    this.$headerUtility = this.$container.find(".header__utility");
    this.setFixedElement();
    this.setPhysical();
    this.controller(); // 초기 로드시 스크롤위치가 0이 아닐수 있기때문에 고정/고정해제할지 체크
    this.deviceType = commons.getDeviceType();

    //이벤트 바인드
    $win.on("resize.stickyHeader", $.proxy(this.reset, this));
    $win.on("scroll.stickyHeader", $.proxy(this.controller, this));

    //커스텀 이벤트 등록
    commons.event.listener(EVENT.ON_CHANGE_DOM_SIZE, $.proxy(this.reset, this));
  },
  isChangeDeviceType: function () {
    if (this.deviceType !== commons.getDeviceType()) {
      this.deviceType = commons.getDeviceType();

      return true;
    }
    return false;
  },
  /** 고정되어야 하는 DOM 요소 설정 */
  setFixedElement: function() {
    var isMainDesktop = this.isMainDesktop();

    if ($(window).width() < 767) {
        this.$fixedElementWrapper = isMainDesktop ? this.$header : this.$container;
        this.$fixedElement = isMainDesktop ? this.$headerBottom : this.$header;
    } else {
        this.$fixedElementWrapper = isMainDesktop ? this.$headsearch : this.$container;
        this.$fixedElement = isMainDesktop ? this.$headerBottom : this.$headsearch;
    }
  },
  /** 고정이 시작되는 posY 위치값과 고정되었을때 헤더에 적용되어야하는 padding 값을 구한다. */
  setPhysical: function() {
    this.fixedPosY = this.$container.outerHeight() - this.$fixedElement.outerHeight() + this.$popupWin.outerHeight() + $("#main_search").outerHeight();
    this.bufferValue = this.$fixedElement.outerHeight();
  },
  /** 현재 페이지가  PC형태의 메인페이지 여부를 반환 */
  isMainDesktop: function () {
    var isMain = commons.getPageType() === PAGE_CLASS_MAIN;
    var isMobile = commons.getDeviceType() === DEVICE_TYPE_MOBILE;
    return isMain && !isMobile;
  },
  /** 화면 사이즈가 변경되었을때 */
  reset: function() {
    if (this.isChangeDeviceType()) {
      this.detach();
    }

    this.setFixedElement();
    this.setPhysical();
    this.controller();
  },
  /** 현재 스크롤 위치값을 확인하여 헤더가 고정되어야 하는지 아닌지를 결정한다 */
  controller: function() {
    var scroll = 0;
    var scrollTop = $win.scrollTop();
    if ($(window).width() < 767) {
      scroll=0;
    } else {
      scroll = this.fixedPosY;
    }
    scrollTop > scroll? this.attach() : this.detach();
  },
  /** 헤더를 상단에 고정한다. */
  attach: function() {
    this.$container.parents().find('.sub').addClass('sub_fixed');
    this.$container.parents().find('.main').addClass('main_fixed');
   // this.$fixedElementWrapper.css({ paddingBottom: this.bufferValue });
    //this.$fixedElement.css({ position: "fixed", top: 0 });
    //this.$fixedElement.css({ position: "fixed", top: 0, borderBottom: "1px solid #ddd"});
      this.$fixedElement.addClass('is_fixed_hd');

    this.isAttach = false;
  },
  /** 고정되어 있는 헤더를 해제한다. */
  detach: function() {
    this.$container.parents().find('.sub').removeClass('sub_fixed');
    this.$container.parents().find('.main').removeClass('main_fixed');
    this.$fixedElementWrapper.removeAttr("style");
   // this.$fixedElement.removeAttr("style");
    this.$container.parents().find('.header').removeClass('is_fixed_hd');
    //this.$fixedElement.removeClass("is_fixed_hd");
    this.isAttach = false;
  },
  /**
   * 고정된 해더가 요소의 높이값을 반환한다.
   * @public
   */
  getHeaderHeight: function() {
    return this.isAttach
      ? this.$fixedElement.outerHeight()
      : this.$container.outerHeight() - $win.scrollTop();
  },

  /** 기본 헤더의 고정 상태 */
  isAttach: true
};

/*************************************************************************************
 최상단 배너 스크립트
**************************************************************************************/
var noticeBanner = {
  init: function() {
    this.speed = 300;

    // 필요한 객체 선택
    this.$container = $(".banner__notice-wrap");
    this.$content = this.$container.find(".banner__content");
    this.$toggler = this.$container.find(".banner__controller button");

    // 버튼에 초기 값 변경
    this.isExpanded ? this.expanded(0) : this.collapsed(0);

    // 이벤트 바인드
    this.$toggler.on("click", $.proxy(this.controller, this));
  },
  /** 현재 배너 상태에 따라 배너를 열고/닫을지 결정한다 */
  controller: function(e) {
    e.preventDefault();
    var isExpand = this.$toggler.attr(A11Y.EXPANDED) === "true";
    isExpand ? this.collapsed() : this.expanded();
  },
  /** 배너를 확장시킨다. */
  expanded: function(speed) {
    // 파라미터로 스피드 값이 없으면 디폴트 스피드 적용
    var speed = speed === undefined ? this.speed : 0;

    // 배너 확장
    this.$content.stop().slideDown(
      speed,
      $.proxy(function() {
        // 배너가 확장되고 실행할 코드들...
        this.isExpanded = true; // 현재 축소여부 변경
        this.$toggler.attr(A11Y.EXPANDED, true); // 버튼 아리아 속성값 변경
        this.$content.attr("style", "display:block"); // 토글버튼을 연달아 눌렀을 때 이슈 해결용
        //커스텀 이벤트 실행
        commons.event.trigger(EVENT.ON_CHANGE_DOM_SIZE);
      }, this)
    );
  },
  /** 배너를 축소시킨다. */
  collapsed: function(speed) {
    // 파라미터로 스피드 값이 없으면 디폴트 스피드 적용
    var speed = speed === undefined ? this.speed : 0;

    // 배너축소
    this.$content.stop().slideUp(
      speed,
      $.proxy(function() {
        // 배너가 축소되고 실행할 코드들...
        this.isExpanded = false; // 현재 축소여부 변경
        this.$toggler.attr(A11Y.EXPANDED, false); // 버튼 아리아 속성값 변경
        this.$content.attr("style", "display:none"); // 토글버튼을 연달아 눌렀을 때 이슈 해결용
        //커스텀 이벤트 실행
        commons.event.trigger(EVENT.ON_CHANGE_DOM_SIZE);
      }, this)
    );
  },

  /** 기본 상태값 */

  isExpanded: true
};

/*************************************************************************************
  GNB 메뉴 열고/닫기 및 세팅
**************************************************************************************/
var gnb = {
  init: function() {
    this.$container = $(".header");
    this.$gnbBackground = this.$container.find(".menu_bg");
    // 원뎁스
    this.$gnbOneDepthList = this.$container.find(".menu-gnb-depth1");
    this.$gnbOneDepthItems = this.$container.find(".menu-gnb-depth1__item");
    this.$gnbOneDepthItemsEv = this.$gnbOneDepthItems.find("a");
    // 하위 메뉴
    this.$gnbSubDepthList = this.$container.find(".menu-gnb-depth2");
    this.$gnbSubDepthItems = this.$container.find(".menu-gnb-depth2__item");

    // gnb 속송값
    this.activeOneDepthClass = "gnb-depth1--active";
    this.activeSubDepthClass = "gnb-depth2--active";

    // gnb메뉴 확장활성화 기능 비활성화 여부
    this.isDisabled = false;
    // 서브메뉴 높이값 설정
    this.reset();

    /************ 이벤트 바인드 ************/

    $win.on("resize.gnbResize", $.proxy(this.reset, this));
    /** GNB전체 닫힘 */
    this.$gnbOneDepthList.on(
      "mouseleave focusoutside",
      $.proxy(this.collapsed, this)
    );
    /** GNB메뉴 활성화 && 원뎁스 메뉴 활성화 */
    this.$gnbOneDepthItemsEv.on(
      "mouseover focusin",
      $.proxy(this.expanded, this)
    );
    /*this.$gnbOneDepthItems.on(
      "mouseover focusin",
      $.proxy(this.expandedOn, this)
    );*/
    /** 원뎁스 메뉴 비활성화 */
    this.$gnbOneDepthItems.on(
      "mouseleave focusout",
      $.proxy(this.inactivationOneDepth, this)
    );
    /** 서브 메뉴 활성화 */
    this.$gnbSubDepthItems.on(
      "mouseover focusin",
      $.proxy(this.activeSubDepth, this)
    );
    /** 서브 메뉴 비활성화 */
    this.$gnbSubDepthItems.on(
      "mouseleave focusout",
      $.proxy(this.inactivationSubDepth, this)
    );

    /** 커스텀이벤트 리스너 등록 */
    commons.event.listener(
      EVENT.EXPANDED_ALLMENU,
      $.proxy(function() {
        this.isDisabled = true;
        this.collapsed();
      }, this)
    );

    /** 커스텀이벤트 리스너 등록 */
    commons.event.listener(
      EVENT.COLLAPSED_ALLMENU,
      $.proxy(function() {
        this.isDisabled = false;
      }, this)
    );
  },
  /** 화면이 리사이징 될때 마다 하위메뉴 및 배경 높이값을 설정한다 */
  reset: function() {
    var mexHeight = 0;

    this.$gnbSubDepthList.removeAttr("style");
    this.$gnbSubDepthList.each(function(index, el) {
      mexHeight =
        mexHeight > $(el).outerHeight() ? mexHeight : $(el).outerHeight();
    });

    this.$gnbBackground.outerHeight(mexHeight +2);
    this.$gnbSubDepthList.outerHeight(mexHeight);
  },
  /** GNB 메뉴를 활성화 한다. */
  expanded: function(e) {
    if (this.isDisabled) return;

    this.activeOneDepth(e);
    this.$gnbBackground.show();
    this.$gnbSubDepthList.show();
    this.isExpanded = true;
    $(".header__inner-gnb").addClass("active");
  },
  expandedOn: function(e) {
    if (this.isDisabled) return;

    this.activeOneDepth(e);
  },
  /** GNB 메뉴를 비활성화 한다. */
  collapsed: function(e) {
    this.$gnbBackground.hide();
    this.$gnbSubDepthList.hide();
    this.isExpanded = false;
    $(".header__inner-gnb").removeClass("active");
  },
  /** 원뎁스 메뉴를 활성화 한다 */
  activeOneDepth: function(e) {
    $(e.currentTarget).closest(".menu-gnb-depth1__item").addClass(this.activeOneDepthClass);
  },
  /** 원뎁스 메뉴를 비활성화 한다 */
  inactivationOneDepth: function(e) {
    $(e.currentTarget).removeClass(this.activeOneDepthClass);
  },
  /** 서브 메뉴를 활성화 한다 */
  activeSubDepth: function(e) {
    $(e.currentTarget).addClass(this.activeSubDepthClass);
  },
  /** 서브 메뉴를 비활성화 한다 */
  inactivationSubDepth: function(e) {
    $(e.currentTarget).removeClass(this.activeSubDepthClass);
  },
  /** 기본 상태값 */
  isExpanded: false
};

/*************************************************************************************
  전체 메뉴 열고 닫기(with mobile)
**************************************************************************************/
var allMenu = {
  init: function() {
    // 기본값 설정
    this.speed = 500; // 확장축소 속도
    this.depthOneWrapperSelector = ".menu-all-depth1__item";
    this.depthOneToggleSelector = ".depth1"; // 1뎁스 메뉴 아이템
    this.depthOneMenuSelector = ".menu-all-depth1-category"; // 1뎁스 메뉴
    this.subMenuSelector = "ul"; // 2뎁스 이하의 하위메뉴 선택자
    this.subToggleSelector = ".menu-all-depth1-category .depth"; // 2뎁스 이하 하위 메뉴토글버튼
    this.scrollInnerSelector = ".menu-all-inner--scroll.scrollbar-outer";

    // 필요한 객체 선택
    this.$container = $(".menu-tool-wrap");
    this.$toggler = this.$container.find(".btn-open");
    this.$closeer = this.$container.find(".btn-close");
    this.$allMenu = this.$container.find(".menu-all-wrap");

    // 스크롤 영역
    this.$scrollBox = this.$container.find(".menu-all-inner--scrollbox");
    this.$allMenuInner = this.$container.find(".menu-all-inner");
    this.$allMenuTitle = this.$allMenuInner.find(".title");
    this.$subMenuToggler = this.$container.find(this.subToggleSelector);
    // 스크롤 영역 원본 DOM
    this.originChildren = this.$scrollBox.html();
    this.changeMobileDevice = false;

    this.reset();
    this.isExpanded ? this.expanded(0) : this.collapsed(0); // 로드시 기 상태

    // 이벤트 바인드
    $win.on("resize", $.proxy(this.reset, this));
    this.$toggler.on("click", $.proxy(this.controller, this));
    this.$closeer.on("click", $.proxy(this.collapsed, this));
    this.$allMenu.on("click",this.depthOneToggleSelector,$.proxy(this.togglerMobileDepthOneMenu, this));
    this.$allMenu.on("click",this.subToggleSelector,$.proxy(this.subController, this));

    //커스텀 이벤트 등록
    commons.event.listener(EVENT.ON_CHANGE_DOM_SIZE, $.proxy(this.reset, this));
  },
  /**
   * window resize / EVENT.ON_CHANGE_DOM_SIZE 이벤트 발생 시
   */
  reset: function(e, eventName) {
    var speed = eventName === EVENT.ON_CHANGE_DOM_SIZE ? this.speed : 0;

    // 하위 메뉴 모두가 활성화 되어야 하는지 아닌지를 체크
    this.isSubAllExpanded =
      commons.getDeviceType() === DEVICE_TYPE_DESKTOP
        ? this.defaultStateDesktop
        : commons.getDeviceType() === DEVICE_TYPE_TABLET
        ? this.defaultStateTablet
        : this.defaultStateMobile;

    // 모바일 디바이스에서 스크롤 및 활성화 메뉴 초기화
    if (commons.getDeviceType() === DEVICE_TYPE_MOBILE) {
      this.removeScroller();
      if (!this.changeMobileDevice) {
        this.activeMobileDepthOneMenu(0);
        this.changeMobileDevice = true;
      }
    } else {
      this.changeMobileDevice = false;
    }

    // 하위 메뉴 모두가 활성화 여부에 따라 전체메뉴 활성화 비활성화.
    this.isSubAllExpanded
      ? this.allExpandedSubMenu(0)
      : this.allCollapsedSubMenu(0);

    // 확장되어 있을 경우에만 확장이벤트 실행
    this.isExpanded && this.expanded(speed);
  },
  /**
   * 헤더를 제외한 나머지 높이값 === PC에서 전체메뉴의 높이값
   */
  withoutHeaderHeight: function() {
    var windowHeight = $win.outerHeight();
    // stickyHeader객체에서 직접 메소드로 보여지고 있는 헤더의 높이값을 가져옴
    var headerHeight = stickyHeader.getHeaderHeight();

    return windowHeight - headerHeight;
  },
  /**
   * 전체메뉴를 확장/축소할지 결정하여 확장/축소 메소드를 호출한다.
   */
  controller: function(e) {
    e.preventDefault();
    var isExpand = this.$toggler.attr(A11Y.EXPANDED) === "true";

    isExpand ? this.collapsed() : this.expanded();
  },
  /**
   * 전체메뉴를 확대한다.
   */
  expanded: function(speed) {
    // 스피드 설정(파라미터값이 있으면 파라미터 값으로 없으면 기본 설정값으로)
    var speed = speed === undefined ? this.speed : speed;

    // 모션값 설정
    var options =
      commons.getDeviceType() === DEVICE_TYPE_MOBILE
        ? { left: 0 }
        : { height: this.withoutHeaderHeight(), opacity: 1 };

    // 전체스크롤 막기
    commons.disabledScroll();

    // 버튼 aria값 설정
    this.isExpanded = true;
    this.$toggler.attr(A11Y.EXPANDED, this.isExpanded);

    // 커스텀이벤트 트리거 -> GNB 메뉴 기능 일시정지
    commons.event.trigger(EVENT.EXPANDED_ALLMENU, {});

    //확장시키기
    this.$allMenu
      .show()
      .stop()
      .animate(
        options,
        speed,
        $.proxy(function() {
          /** 열기 모션 끝나면... */

          /**
           * pc/테블릿인 경우 스크롤 적용.
           * 모바일로 넘어가는 순간 삭제
           */

          if (commons.getDeviceType() === DEVICE_TYPE_MOBILE) {
            return;
          }

          this.setScroller();
        }, this)
      );

    /** pc에서는 보이지 않게 한다 */
    if ($(window).width() > 767){
  	  this.$allMenu.hide();
    }
  },
  /**
   * 전체메뉴를 축소한다.
   */
  collapsed: function(speed) {
    // 스피드 설정(파라미터값이 있으면 파라미터 값으로 없으면 기본 설정값으로)
    var speed = speed === undefined ? this.speed : speed;
    // 모션값 설정
    var options =
      commons.getDeviceType() === DEVICE_TYPE_MOBILE
        ? { left: "-100%" }
        : { height: 0, opacity: 0 };

    // 전세스크롤 활성화
    commons.enabledScroll();

    // 버튼 aria값 설정
    this.isExpanded = false;
    this.$toggler.attr(A11Y.EXPANDED, this.isExpanded);

    // 커스텀이벤트 트리거 -> GNB 메뉴 기능 일시정지풀기
    commons.event.trigger(EVENT.COLLAPSED_ALLMENU, {});

    // 비활성화 모션
    this.$allMenu.stop().animate(options, {
      duration: speed,
      complete: $.proxy(function() {
        /** 닫기 모션 끝나면... */
        // 전체메뉴 display:none 처리
        this.$allMenu.removeAttr("style");
        // 기본 하위 메뉴상태가 열려 있는 거라면 모든 하위메뉴 확장 아니라면 축소
        // 2020.02.13.모바일기기 현재메뉴 표시를 위한 주석처리
        /*this.isSubAllExpanded
          ? this.allExpandedSubMenu(0)
          : this.allCollapsedSubMenu(0);*/
      }, this)
    });
  },
  /**
   * 하위메뉴를 확장/축소할지 결정하여 확장/축소 메소드를 호출한다.
   */
  subController: function(e) {
    var $target = $(e.currentTarget);
    var isExpand = $target.attr(A11Y.EXPANDED);

    // aria-expanded가 없으면 하위 메뉴가 없는 것으로 함수를 종료한다.
    if (isExpand === undefined) {
      return;
    }
    // 기본 기능을 막는다.(링크이동막기)
    e.preventDefault();
    // 확장여부에 따라 하위메뉴를 확장/축소한다.
    isExpand === "true"
      ? this.collapsedSubMenu($target)
      : this.expandedSubMenu($target);
  },
  /**
   * 하위메뉴를 확장한다.
   */
  expandedSubMenu: function($target, speed) {
    var speed = speed === undefined ? this.speed : speed;

    // 확장축소될 하위 메뉴리스트
    var $subMenu = $target.siblings(this.subMenuSelector);

    // 기본에 확장되어 있는 아이템응 축소시킨다.
    !this.isSubAllExpanded &&
      this.collapsedSubMenu(
        $target
          .parents()
          .siblings()
          .find("[" + A11Y.EXPANDED + "=true]")
      );

    // 클릭한 2뎁스 메뉴아이템의 아리아값 변경
    $target.attr(A11Y.EXPANDED, true);

    // 하위메뉴 확대
    $subMenu.stop().slideDown(
      $.proxy(function() {
        $subMenu.attr("style", "display:block");
      }, this)
    );
  },
  /**
   * 하위메뉴를 축소한다.
   */
  collapsedSubMenu: function($target, speed) {
    if (this.isSubAllExpanded) return;
    var speed = speed === undefined ? this.speed : speed;

    // 확장축소될 하위 메뉴리스트
    var $subMenu = $target.siblings(this.subMenuSelector);

    // 클릭한 2뎁스 메뉴아이템의 아리아값 변경
    $target.attr(A11Y.EXPANDED, false);

    // 하위메뉴 축소
    $subMenu.stop().slideUp(
      $.proxy(function() {
        $subMenu.attr("style", "display:none");
      }, this)
    );
  },
  /**
   * 모든 하위 메뉴를 확장시킨다.
   */
  allExpandedSubMenu: function() {
    var $subMenus = this.$subMenuToggler.siblings(this.subMenuSelector);

    // 하위 메뉴를 보이고 하위메뉴가 있는 2뎁스 아이템에만 aria 속성 적용
    $subMenus
      .show()
      .siblings(this.$subMenuToggler)
      .attr(A11Y.EXPANDED, true);
  },
  /**
   * 모든 하위 메뉴를 축소시킨다.
   */
  allCollapsedSubMenu: function() {
    var $subMenus = this.$subMenuToggler.siblings(this.subMenuSelector);

    // 하위 메뉴를 숨기고 하위메뉴가 있는 2뎁스 아이템에만 aria 속성 적용
    $subMenus
      .hide()
      .siblings(this.$subMenuToggler)
      .attr(A11Y.EXPANDED, false);
  },
  /**
   * 모바일에서 원뎁스 메뉴를 클릭 했을때 해당 메뉴를 활성화 시킬지 말지 결정한다
   */
  togglerMobileDepthOneMenu: function(e) {
    var $target = $(e.target);
    var hasNotMenu = $target.next(this.depthOneMenuSelector).length === 0;
    var isNotMobile = commons.getDeviceType() !== DEVICE_TYPE_MOBILE;
    var index = $target.parent().index();

    if (hasNotMenu || isNotMobile) return;

    e.preventDefault();
    this.activeMobileDepthOneMenu(index);
  },
  /**
   * 파라미터로 받은 인덱스의 원뎁스메뉴를 활성화한다.
   */
  activeMobileDepthOneMenu: function(index) {
    this.$container
      .find(this.depthOneWrapperSelector)
      .eq(index)
      .toggleClass("depth1--selected")
      .siblings()
      .removeClass("depth1--selected");
  },
  /**
   * 스크롤을 생성 및 스크롤 사이즈를 조정한다.
   */
  setScroller: function() {
    if (!this.hasScrollbar()) {
      /**
       * 스크롤바가 적용되는 요소를 객체로 담아서 적용하면 스크롤바가 제대로 작동하지 않는 이슈가 있어
       * 별도의 객체로 담아 두지 않고 스크립트 적용
       */

      $(this.scrollInnerSelector)
        .not(".scroll-content")
        .scrollbar();
      $(this.scrollInnerSelector)
        .not(".scroll-content")
        .attr("data-scrollbar", true);
    }

    var height = this.getContentHeight();

    $(this.scrollInnerSelector)
      .not(".scroll-content")
      .outerHeight(height);
  },
  /**
   * 스크롤이 필요없는 모바일에서는 스크롤을 삭제한다.
   */
  removeScroller: function() {
    if (!this.hasScrollbar()) return;

    this.$scrollBox.html(this.originChildren);
    this.$subMenuToggler = this.$container.find(this.subToggleSelector);
  },
  /**
   * 전체메뉴에 적용될 높이값을 생성.
   * 스크롤 스크립트를 적용하기 위해서는 높이값이 필요하기 때문에 스크립트로 높이값을 적용.
   */
  getContentHeight: function() {
    return (
      this.$allMenuInner.outerHeight(true) -
      this.$allMenuTitle.outerHeight(true)
    );
  },
  /**
   * 현재 스크롤 스크립트가 적용되어 있는지 체크한다.
   */
  hasScrollbar: function() {
    var $scrollInner = $(this.scrollInnerSelector).not(".scroll-content");
    var isScroll = $scrollInner.attr("data-scrollbar") === "true";

    return isScroll;
  },
  /** 초기 및 현재 메뉴의 확장/축소 상태를 체크하기 위한 값 */
  isExpanded: false,
  isSubAllExpanded: false,
  /** true이면 메뉴를 확장했을때 모든 요소가 확장되어 있음 */
  defaultStateDesktop: true, // 데스크탑
  defaultStateTablet: false, // 테블릿
  defaultStateMobile: false // 모바일
};

/*************************************************************************************
  가상키보드
**************************************************************************************/
var VRKeyboard = function (inputSelector, openerSelector, keyboardWrapper, options) {
  this.setting = $.extend({
    closerSelector:'.worldword-close',
    languageTabsSelector: '.language a',
    languageTabpanelsSelector: ".language-contents",

    initialLanguage: '히라가나',
    activeClassName: "selected",
    position: { top: null, left: null, bottom: null, right: null, zIndex: null },

    focusTargetWhenClosed: null,
  }, options || {});

  if(!$(inputSelector).length) {
    return console.warn('가상키보드 초기화 실패:' + inputSelector + '없음');
  }
  if(!$(openerSelector).length) {
    return console.warn('가상키보드 초기화 실패:' + openerSelector + '없음');
  }
  if(!$(keyboardWrapper).length) {
    return console.warn('가상키보드 초기화 실패:' + keyboardWrapper + '없음');
  }
  this.init(inputSelector, openerSelector, keyboardWrapper);
}

VRKeyboard.prototype = {
  constructor: this.constructor,

  init: function (inputSelector, openerSelector, keyboardWrapper) {
    this.$input           = $(inputSelector);
    this.$opener          = $(openerSelector);
    this.$keyboardWrapper = $(keyboardWrapper);
    this.$keyboard        = this.getCloneVrKeyboard();
    this.$closer          = this.$keyboard.find(this.setting.closerSelector);
    this.$languageTabs    = this.$keyboard.find(this.setting.languageTabsSelector);
    this.$languageTabpanels = this.$keyboard.find(this.setting.languageTabpanelsSelector);

    if (this.getPosition(this.$keyboardWrapper) === 'static') {
      this.setPosition(this.$keyboardWrapper, 'relative');
    }

    this.$keyboardWrapper.append(this.$keyboard);
    this.$keyboard.css(this.setting.position);
    this.currentLanguage = this.setting.initialLanguage;

    this.showLanguage(this.setting.initialLanguage);

    this.$opener.on('click', $.proxy(function () {
      this.$keyboard.toggle();
    }, this));

    this.$closer.on('click', $.proxy(function () {
      ( this.setting.focusTargetWhenClosed && $(this.setting.focusTargetWhenClosed).focus() ) || this.$opener.focus();

      this.$keyboard.hide();
    }, this));

    this.$languageTabs.on('click', $.proxy(function (e) {

      this.languageController(e)
    }, this));

    this.$languageTabpanels.on('click', 'a', $.proxy(function (e) {
      e.preventDefault();

      var inputVal = this.$input.val();
      var val = e.target.innerText

      this.$input.trigger('change');
      this.$input.val(inputVal + val)
    }, this));
  },

  getCloneVrKeyboard: function () {
    window.$originVRKeyboard = (window.$originVRKeyboard && window.$originVRKeyboard.length) ? window.$originVRKeyboard : $('.worldword-wrap');

    if (!window.$originVRKeyboard.length) {
      return console.warn('가상키보드가 없습니다.');
    }

    return window.$originVRKeyboard.clone();
  },

  getPosition: function ($el) {
    return $el.css('position');
  },

  setPosition: function ($el, position) {
    $el.css('position', position);
  },
  languageController: function(e) {
    var type = $(e.target).attr("data-type");

    this.hideLanguage(this.currentLanguage);
    this.showLanguage(type);
  },
  showLanguage: function(type) {
    var $languageTab = this.$keyboard.find(
      this.setting.languageTabsSelector + "[data-type=" + type + "]"
    );
    var $languageTabpanel = this.$keyboard.find(
      this.setting.languageTabpanelsSelector + "[data-type=" + type + "]"
    );

    $languageTab.addClass(this.setting.activeClassName);
    $languageTabpanel.show();
    this.currentLanguage = type;
  },
  hideLanguage: function(type) {
    var $languageTab = this.$keyboard.find(
      this.setting.languageTabsSelector + "[data-type=" + type + "]"
    );
    var $languageTabpanel = this.$keyboard.find(
      this.setting.languageTabpanelsSelector + "[data-type=" + type + "]"
    );

    $languageTab.removeClass(this.setting.activeClassName);
    $languageTabpanel.hide();
  },
}

/*************************************************************************************
  검색영역(with mobile)
**************************************************************************************/
var search = {
  init: function() {
    // 기본값 설정
    this.speed = 500; // 확장축소 속도

    // 필요한 객체 선택
    this.$container = $(".header__search-wrap");
    this.$toggler = this.$container.find(".btn-search--open");
    this.$closeer = this.$container.find(".btn-search--close");
    this.$allMenu = this.$container.find(".search-all-wrap");
    this.scrollInnerSelector = ".search-all-inner--scroll.scrollbar-outer";

    // 스크롤 영역
    this.$scrollBox = this.$container.find(".search-all-inner--scrollbox");
    this.$allMenuInner = this.$container.find(".search-all-inner");
    this.$subMenuToggler = this.$container.find(this.subToggleSelector);
    // 스크롤 영역 원본 DOM
    this.originChildren = this.$scrollBox.html();
    this.changeMobileDevice = false;

    this.reset();
    this.isExpanded ? this.expanded(0) : this.collapsed(0); // 로드시 대기 상태

    // 이벤트 바인드
    $win.on("resize", $.proxy(this.reset, this));
    this.$toggler.on("click", $.proxy(this.controller, this));
    this.$closeer.on("click", $.proxy(this.collapsed, this));
    this.$allMenu.on(
      "click",
      this.depthOneToggleSelector,
      $.proxy(this.togglerMobileDepthOneMenu, this)
    );
    this.$allMenu.on(
      "click",
      this.subToggleSelector,
      $.proxy(this.subController, this)
    );

    //커스텀 이벤트 등록
    commons.event.listener(EVENT.ON_CHANGE_DOM_SIZE, $.proxy(this.reset, this));
  },
  /**
   * window resize / EVENT.ON_CHANGE_DOM_SIZE 이벤트 발생 시
   */
  reset: function(e, eventName) {
    var speed = eventName === EVENT.ON_CHANGE_DOM_SIZE ? this.speed : 0;

    // 하위 메뉴 모두가 활성화 되어야 하는지 아닌지를 체크
    this.isSubAllExpanded =
      commons.getDeviceType() === DEVICE_TYPE_DESKTOP
        ? this.defaultStateDesktop
        : commons.getDeviceType() === DEVICE_TYPE_TABLET
        ? this.defaultStateTablet
        : this.defaultStateMobile;

    // 하위 메뉴 모두가 활성화 여부에 따라 전체메뉴 활성화 비활성화.
    this.isSubAllExpanded
      ? this.allExpandedSubMenu(0)
      : this.allCollapsedSubMenu(0);

    // 확장되어 있을 경우에만 확장이벤트 실행
    this.isExpanded && this.expanded(speed);
  },
  /**
   * 헤더를 제외한 나머지 높이값 === PC에서 전체메뉴의 높이값
   */
  withoutHeaderHeight: function() {
    var windowHeight = $win.outerHeight();
    // stickyHeader객체에서 직접 메소드로 보여지고 있는 헤더의 높이값을 가져옴
    var headerHeight = stickyHeader.getHeaderHeight();

    return windowHeight - headerHeight;
  },
  /**
   * 전체메뉴를 확장/축소할지 결정하여 확장/축소 메소드를 호출한다.
   */
  controller: function(e) {
    e.preventDefault();
    var isExpand = this.$toggler.attr(A11Y.EXPANDED) === "true";

    isExpand ? this.collapsed() : this.expanded();
  },
  /**
   * 전체메뉴를 확대한다.
   */
  expanded: function(speed) {
    // 스피드 설정(파라미터값이 있으면 파라미터 값으로 없으면 기본 설정값으로)
    var speed = speed === undefined ? this.speed : speed;

    // 모션값 설정
    var options =
      commons.getDeviceType() === DEVICE_TYPE_MOBILE
        ? { right: 0 }
        : { height: this.withoutHeaderHeight(), opacity: 1 };

    // 전체스크롤 막기
    commons.disabledScroll();
    commons.disabledView();
    // 통합검색영역 클래스 추가
    //commons.addClass('search-opened');

    // 버튼 aria값 설정
    this.isExpanded = true;
    this.$toggler.attr(A11Y.EXPANDED, this.isExpanded);

    // 커스텀이벤트 트리거 -> GNB 메뉴 기능 일시정지
    commons.event.trigger(EVENT.EXPANDED_ALLMENU, {});

    //확장시키기
    this.$allMenu
      .show()
      .stop()
      .animate(
        options,
        speed,
        $.proxy(function() {
          /** 열기 모션 끝나면... */

          /**
           * pc/테블릿인 경우 스크롤 적용.
           * 모바일로 넘어가는 순간 삭제
           */

          if (commons.getDeviceType() === DEVICE_TYPE_MOBILE) {
            return;
          }

          this.setScroller();
        }, this)
      );
  },
  /**
   * 전체메뉴를 축소한다.
   */
  collapsed: function(speed) {
    // 스피드 설정(파라미터값이 있으면 파라미터 값으로 없으면 기본 설정값으로)
    var speed = speed === undefined ? this.speed : speed;
    // 모션값 설정
    var options =
      commons.getDeviceType() === DEVICE_TYPE_MOBILE
        ? { right: "-100%" }
        : { height: 0, opacity: 0 };

    // 전체스크롤 활성화
    commons.enabledScroll();
    commons.enabledView();

    // 버튼 aria값 설정
    this.isExpanded = false;
    this.$toggler.attr(A11Y.EXPANDED, this.isExpanded);

    // 커스텀이벤트 트리거 -> GNB 메뉴 기능 일시정지풀기
    commons.event.trigger(EVENT.COLLAPSED_ALLMENU, {});

    // 비활성화 모션
    this.$allMenu.stop().animate(options, {
      duration: speed,
      complete: $.proxy(function() {
        /** 닫기 모션 끝나면... */
        // 전체메뉴 display:none 처리
        this.$allMenu.removeAttr("style");
        // 기본 하위 메뉴상태가 열려 있는 거라면 모든 하위메뉴 확장 아니라면 축소
        this.isSubAllExpanded
          ? this.allExpandedSubMenu(0)
          : this.allCollapsedSubMenu(0);
      }, this)
    });
  },
  /**
   * 하위메뉴를 확장/축소할지 결정하여 확장/축소 메소드를 호출한다.
   */
  subController: function(e) {
    var $target = $(e.currentTarget);
    var isExpand = $target.attr(A11Y.EXPANDED);

    // aria-expanded가 없으면 하위 메뉴가 없는 것으로 함수를 종료한다.
    if (isExpand === undefined) {
      return;
    }
    // 기본 기능을 막는다.(링크이동막기)
    e.preventDefault();
    // 확장여부에 따라 하위메뉴를 확장/축소한다.
    isExpand === "true"
      ? this.collapsedSubMenu($target)
      : this.expandedSubMenu($target);
  },
  /**
   * 하위메뉴를 확장한다.
   */
  expandedSubMenu: function($target, speed) {
    var speed = speed === undefined ? this.speed : speed;

    // 확장축소될 하위 메뉴리스트
    var $subMenu = $target.siblings(this.subMenuSelector);

    // 기본에 확장되어 있는 아이템응 축소시킨다.
    !this.isSubAllExpanded &&
      this.collapsedSubMenu(
        $target
          .parents()
          .siblings()
          .find("[" + A11Y.EXPANDED + "=true]")
      );

    // 클릭한 2뎁스 메뉴아이템의 아리아값 변경
    $target.attr(A11Y.EXPANDED, true);

    // 하위메뉴 확대
    $subMenu.stop().slideDown(
      $.proxy(function() {
        $subMenu.attr("style", "display:block");
      }, this)
    );
  },
  /**
   * 하위메뉴를 축소한다.
   */
  collapsedSubMenu: function($target, speed) {
    if (this.isSubAllExpanded) return;
    var speed = speed === undefined ? this.speed : speed;

    // 확장축소될 하위 메뉴리스트
    var $subMenu = $target.siblings(this.subMenuSelector);

    // 클릭한 2뎁스 메뉴아이템의 아리아값 변경
    $target.attr(A11Y.EXPANDED, false);

    // 하위메뉴 축소
    $subMenu.stop().slideUp(
      $.proxy(function() {
        $subMenu.attr("style", "display:none");
      }, this)
    );
  },
  /**
   * 모든 하위 메뉴를 확장시킨다.
   */
  allExpandedSubMenu: function() {
    var $subMenus = this.$subMenuToggler.siblings(this.subMenuSelector);

    // 하위 메뉴를 보이고 하위메뉴가 있는 2뎁스 아이템에만 aria 속성 적용
    $subMenus
      .show()
      .siblings(this.$subMenuToggler)
      .attr(A11Y.EXPANDED, true);
  },
  /**
   * 모든 하위 메뉴를 축소시킨다.
   */
  allCollapsedSubMenu: function() {
    var $subMenus = this.$subMenuToggler.siblings(this.subMenuSelector);

    // 하위 메뉴를 숨기고 하위메뉴가 있는 2뎁스 아이템에만 aria 속성 적용
    $subMenus
      .hide()
      .siblings(this.$subMenuToggler)
      .attr(A11Y.EXPANDED, false);
  },

  /**
   * 스크롤을 생성 및 스크롤 사이즈를 조정한다.
   */
  setScroller: function() {
    if (!this.hasScrollbar()) {
      /**
       * 스크롤바가 적용되는 요소를 객체로 담아서 적용하면 스크롤바가 제대로 작동하지 않는 이슈가 있어
       * 별도의 객체로 담아 두지 않고 스크립트 적용
       */

      $(this.scrollInnerSelector)
        .not(".scroll-content")
        .scrollbar();
      $(this.scrollInnerSelector)
        .not(".scroll-content")
        .attr("data-scrollbar", true);
    }

    var height = this.getContentHeight();

    $(this.scrollInnerSelector)
      .not(".scroll-content")
      .outerHeight(height);
  },
  /**
   * 스크롤이 필요없는 모바일에서는 스크롤을 삭제한다.
   */
  removeScroller: function() {
    if (!this.hasScrollbar()) return;

    this.$scrollBox.html(this.originChildren);
    this.$subMenuToggler = this.$container.find(this.subToggleSelector);
  },
  /**
   * 전체메뉴에 적용될 높이값을 생성.
   * 스크롤 스크립트를 적용하기 위해서는 높이값이 필요하기 때문에 스크립트로 높이값을 적용.
   */
  getContentHeight: function() {
    return (
      this.$allMenuInner.outerHeight(true) -
      this.$allMenuTitle.outerHeight(true)
    );
  },
  /**
   * 현재 스크롤 스크립트가 적용되어 있는지 체크한다.
   */
  hasScrollbar: function() {
    var $scrollInner = $(this.scrollInnerSelector).not(".scroll-content");
    var isScroll = $scrollInner.attr("data-scrollbar") === "true";

    return isScroll;
  },
  /** 초기 및 현재 메뉴의 확장/축소 상태를 체크하기 위한 값 */
  isExpanded: false,
  isSubAllExpanded: false,
  /** true이면 메뉴를 확장했을때 모든 요소가 확장되어 있음 */
  defaultStateDesktop: true, // 데스크탑
  defaultStateTablet: false, // 테블릿
  defaultStateMobile: false // 모바일
};
/*************************************************************************************
  lnb
**************************************************************************************/
$('.lnb li.menu-lnb__item > a').click(function(e){
	var menu = $(this).closest('.menu-lnb__item');
	var sub = $(this).siblings('.menu-lnb__sub');
	var subSi = $(this).closest('.menu-lnb__item').siblings().not('.is_lnb1--opened').find('.menu-lnb__sub');

	//class
	var currentActive = 'is_lnb1--opened';
	var currentSlide = 'is_lnb2--slideUp';
	var active = 'is_lnb--opened';


	if(!sub.length) {
		return;
	}
	e.preventDefault();

	if(menu.hasClass(currentActive)) {//현재 페이지 일 때,
		if(menu.hasClass(currentSlide)) {
			menu.removeClass(currentSlide);
			menu.addClass(active);
			sub.slideDown();
		} else {
			menu.addClass(currentSlide);
			menu.removeClass(active);
			sub.slideUp();
		}
	} else {//현재 페이지 외
		if(menu.hasClass(active)) {
			menu.removeClass(active);
			sub.slideUp();
		} else {
			menu.siblings('li').removeClass(active);
			subSi.slideUp();
			menu.addClass(active);
			sub.slideDown();
		}
	}

});
/*************************************************************************************
  categoryTabsMenu
**************************************************************************************/
var categoryTabs = function(container, options) {
  /** 기본 옵션 */
  this.defaultOption = {

    tabListClassName: ".category_list",
    tabItemClassName: ".category_item",
    tabPanelWrapClassName: ".category_tabpanel_wrap",
    tabPanelClassName: ".category_tabpanel",

    // 탭리스트 토글러(모바일)
    tabTogglerClassName: ".label_wrap button",

    /** 탭의 활성화 여부를 판단할 속성명 - 탭아이템에 적용된 값 */
    tabActiveStateAttrName: "data-selected",
    /** 탭 패널에 적용할 ID 값을 확인할 속성명 - 탭아이템에 적용된 값 */
    tabTargetSelectAttrName: "data-controls",
    /** 탭리스트의 확장/축소 여부를 판달할 속성명 - 토글버튼에 적용된 값 */
    tabTogglerStateAttrName: "data-expanded",
    initialIndex: undefined,
    beforeTabActive: function () {},
    afterTabActive: function () {},
  };

  this.$container = $(container);
  this.options = options
    ? $.extend(this.defaultOption, options)
    : this.defaultOption;

  this.init();
};
categoryTabs.prototype = {
  constructor: this.constructor,
  init: function() {

    this.$tabWrapper = this.$container.find(this.options.tabListClassName);
    this.$tabs = this.$container.find(this.options.tabItemClassName);
    this.$tabpanelWrap = this.$container.find(this.options.tabPanelWrapClassName);
    this.$tabpanel = this.$container.find(this.options.tabPanelClassName);
    this.$toggler = this.$container.find(this.options.tabTogglerClassName);
    this.deviceType = commons.getDeviceType();

    // 초기 활성화
    this.initActive();

    /** 이벤트 바인드 */
    this.$tabs.on("click", $.proxy(this.clickTabEventHandler, this));
    this.$toggler.on("click",$.proxy(this.clickToggleButtonEventHandler, this));
    this.$tabs.on('keyup', $.proxy(function (e) {
      var keyCode = e.keyCode || e.which;
      var $target = $(e.currentTarget);
      var $nextTarget;

      var index = $target.index();
      var isFirst = $target.attr('data-index') === 'first';
      var isLast = $target.attr('data-index') === 'last';

      if (37 === keyCode || 39 === keyCode || 13 === keyCode) {
        e.preventDefault();
      } else {
        return;
      }

      switch (keyCode) {
        case 13:
          this.activeTab($target);
          break;
        case 37:
          if (isFirst) {
            $nextTarget = this.$tabs.last()
          } else {
            $nextTarget = this.$tabs.eq(index - 1)
          }
          $nextTarget.focus();
          break;
        case 39:
          if (isLast) {
            $nextTarget = this.$tabs.first()
          } else {
            $nextTarget = this.$tabs.eq(index + 1)
          }
          $nextTarget.focus();
          break;
      }
    }, this));
    $win.on("resize", $.proxy(this.resizingWindowEventHandler, this));
  },
  /** 초기에 탭을 활성화 하기위한 함수 */
  initActive: function() {
    var $activeTab = this.$tabWrapper.find(
      "[" + this.options.tabActiveStateAttrName + ' ="true"]'
    );

    this.$tabs.first().attr('data-index', 'first');
    this.$tabs.last().attr('data-index', 'last');

//    this.$tabs.find('a').removeAttr('href');
//    this.$tabs.find('a, button').attr({ 'disabled':true, 'role':'non presentation' });
    this.$tabs.find('a, button').attr({'role':'tab'});

    if ($activeTab.length) {
      this.activeTab($activeTab);
    } else {
      this.activeTab(this.$tabs.eq(this.options.initialIndex));
    }
  },
  isMobile: function() {
    return commons.getDeviceType() === DEVICE_TYPE_MOBILE;
  },
  resizingWindowEventHandler: function() {
    if (this.deviceType === commons.getDeviceType()) {
      return;
    }
    this.deviceType = commons.getDeviceType();
    this.collapsed(0);
  },
  /**
   * 탭 아이템을 클릭했을때 실행할 핸들러
   * 조건에 따라 탭을 활성화 시킨다.
   */
  clickTabEventHandler: function(e) {

    e.preventDefault();

    var $target = $(e.currentTarget);
    // 현재 탭 선택 여부체크
    var isSelected = $target.attr(this.options.tabActiveStateAttrName) === "true";
    var isMobile = this.isMobile();

    // 모바일 확장된 탭리스트를 축소
    isMobile && this.collapsed(0);

    if (isSelected) return;
    // 선택된 탭 활성화
    this.activeTab($target);

  },
  /**
   * 파라미터로 받은 탭을 활성화 시키고 형제요소 탭 비활성화
   * @param {jQuery.DOM} $target 선택된 탭요소의 jQuery 객체
   */
  activeTab: function($target) {
    //var id = $target.attr(this.options.tabTargetSelectAttrName);
    var text = $target.text();
    var isMobile = this.isMobile();
    var index = $target.index();
    this.$tab
	  $target
	  .attr(this.options.tabActiveStateAttrName, true)
	  .siblings()
	  .removeAttr(this.options.tabActiveStateAttrName);
	  this.options.beforeTabActive(index)
	  this.$toggler.text(text);

	  $target.find('a').attr('aria-selected', 'true');
	  $target.siblings().find('a').attr('aria-selected', 'false');

    //개발에서 div 하나로 제어하게 될 경우
    // 탭패널의 아이디 값을 변경한다. this.$tabpanel.attr('id', id);

    //활성화된 탭아이템의 속성값
    var $activeItemTab = this.$tabWrapper.find(
      "[" + this.options.tabActiveStateAttrName + ' ="true"]'
    );
    var isActiveTab = $activeItemTab.attr(this.options.tabActiveStateAttrName);
    isActiveTab && this.activeTabPanel($activeItemTab);
    this.options.afterTabActive(index)
  },
  /**
   * 파라미터로 받은 활성화 탭의 동일한 패널탭 활성화 시키고 형제요소 탭 비활성화
   * @param {jQuery.DOM} $target 선택된 탭요소의 jQuery 객체
   */
  activeTabPanel: function($target) {
    var id = $target.attr(this.options.tabTargetSelectAttrName);
    var $activeTabPanel = this.$tabpanelWrap.find('#' + id);
    $activeTabPanel.show().siblings().hide();
  },
  /**
   * 탭 레이블을 클릭했을때 실행할 핸들러
   * 탭 리스트를 확장시키거나 축소시킨다.
   */
  clickToggleButtonEventHandler: function(e) {
    e.preventDefault();
    var isExpanded =
      $(e.currentTarget).attr(this.options.tabTogglerStateAttrName) === "true";

    if (isExpanded) {
      this.collapsed();
    } else {
      this.expanded();
    }
  },
  /**
   * 모바일에서 탭리스트를 확장
   * @param {Number} speed 확장되는 속도
   */
  expanded: function(speed) {
    this.$toggler.attr(this.options.tabTogglerStateAttrName, true);

    // 탭리스트를 확장
    this.$tabWrapper.stop().slideDown(
      speed,
      $.proxy(function() {
        this.$tabWrapper.attr("style", "display:block");
      }, this)
    );
  },
  /**
   * 모바일에서 탭리스트를 축소
   * @param {Number} speed 축소되는 속도
   */
  collapsed: function(speed) {
    this.$toggler.attr(this.options.tabTogglerStateAttrName, false);

    // 탭리스트를 축소
    this.$tabWrapper.stop().slideUp(
      speed,
      $.proxy(function() {
        // 모션이 종료되면 인라인 style을 초기화
        this.$tabWrapper.removeAttr("style");
      }, this)
    );
  }
};
/*************************************************************************************
  tab
**************************************************************************************/
var Tabs = function(container, options) {
  this.defaultOption = {
    tabListClassName: ".tab_list",
    tabItemClassName: ".tab_item",
    tabPanelWrapClassName: ".tabpanel_wrap",
    tabPanelClassName: ".tabpanel",

    // 탭리스트 토글러(모바일)
    //tabTogglerClassName: '.label_wrap button',

    /** 탭의 활성화 여부를 판단할 속성명 - 탭아이템에 적용된 값 */
    tabActiveStateAttrName: "data-selected",
    /** 탭 패널에 적용할 ID 값을 확인할 속성명 - 탭아이템에 적용된 값 */
    tabTargetSelectAttrName: "data-controls",
    /** 탭리스트의 확장/축소 여부를 판달할 속성명 - 토글버튼에 적용된 값 */
    tabTogglerStateAttrName: "data-expanded",
    initialIndex: undefined,
    beforeTabActive: function () {},
    afterTabActive: function () {},
  };

  this.$container = $(container);
  this.options = options
    ? $.extend(this.defaultOption, options)
    : this.defaultOption;

  this.init();
};

Tabs.prototype = {
  constructor: this.constructor,
  init: function() {
    this.$tabWrapper = this.$container.find(this.options.tabListClassName);
    this.$tabs = this.$container.find(this.options.tabItemClassName);
    this.$tabpanelWrap = this.$container.find(
      this.options.tabPanelWrapClassName
    );
    this.$tabpanel = this.$container.find(this.options.tabPanelClassName);

    // 초기 활성화
    this.initActive();

    /** 이벤트 바인드 */
    this.$tabs.on('click', $.proxy(this.clickTabEventHandler, this));
    this.$tabs.on('keyup', $.proxy(function (e) {
      var keyCode = e.keyCode || e.which;
      var $target = $(e.currentTarget);
      var $nextTarget;

      var index = $target.index();
      var isFirst = $target.attr('data-index') === 'first';
      var isLast = $target.attr('data-index') === 'last';

      if (37 === keyCode || 39 === keyCode || 13 === keyCode) {
        e.preventDefault();
      } else {
        return;
      }

      switch (keyCode) {
        case 13:
          this.activeTab($target);
          break;
        case 37:
          if (isFirst) {
            $nextTarget = this.$tabs.last()
          } else {
            $nextTarget = this.$tabs.eq(index - 1)
          }
          $nextTarget.addClass('is_focus').focus().siblings().removeClass('is_focus');
          break;
        case 39:
          if (isLast) {
            $nextTarget = this.$tabs.first()
          } else {
            $nextTarget = this.$tabs.eq(index + 1)
          }
          $nextTarget.addClass('is_focus').focus().siblings().removeClass('is_focus');
          break;
      }
    }, this));
  },
  /** 초기에 탭을 활성화 하기위한 함수 */
  initActive: function() {
    var $activeTab = this.$tabWrapper.find(
      "[" + this.options.tabActiveStateAttrName + ' ="true"]'
    );

    this.$tabs.first().attr('data-index', 'first');
    this.$tabs.last().attr('data-index', 'last');

    //this.$tabs.find('a').removeAttr('href');
    //this.$tabs.find('a, button').attr({ 'disabled':true, 'role':'non presentation' });

    if ($activeTab.length) {
      this.activeTab($activeTab);
    } else {
      this.activeTab(this.$tabs.eq(this.options.initialIndex));
    }
  },

  /**
   * 탭 아이템을 클릭했을때 실행할 핸들러
   * 조건에 따라 탭을 활성화 시킨다.
   */
  clickTabEventHandler: function(e) {
    e.preventDefault();

    var $target = $(e.currentTarget);
    // 현재 탭 선택 여부체크
    var isSelected = $target.attr(this.options.tabActiveStateAttrName) === "true";

    if (isSelected) return;

    // 선택된 탭 활성화
    this.activeTab($target);
  },
  /**
   * 파라미터로 받은 탭을 활성화 시키고 형제요소 탭 비활성화
   * @param {jQuery.DOM} $target 선택된 탭요소의 jQuery 객체
   */
  activeTab: function($target) {
    // var id = $target.attr(this.options.tabTargetSelectAttrName);
    var index = $target.index();
    this.$tab

    $target
      //.attr('tabindex', 0)
      .attr(this.options.tabActiveStateAttrName, true)
      .siblings()
      //.attr('tabindex', -1)
      .removeAttr(this.options.tabActiveStateAttrName);

    this.options.beforeTabActive(index)

    //활성화된 탭아이템의 속성값
    var $activeItemTab = this.$tabWrapper.find(
      "[" + this.options.tabActiveStateAttrName + ' ="true"]'
    );
    var isActiveTab = $activeItemTab.attr(this.options.tabActiveStateAttrName);
    isActiveTab && this.activeTabPanel($activeItemTab);

    this.options.afterTabActive(index)
  },
  /**
   * 파라미터로 받은 활성화 탭의 동일한 패널탭 활성화 시키고 형제요소 탭 비활성화
   * @param {jQuery.DOM} $target 선택된 탭요소의 jQuery 객체
   */
  activeTabPanel: function($target) {
    var id = $target.attr(this.options.tabTargetSelectAttrName);
    var $activeTabPanel = this.$tabpanelWrap.find('#' + id);
    $activeTabPanel.show().siblings().hide();
  }
};
/*************************************************************************************
  autocomplete
**************************************************************************************/
var autoComplete = function(container,options){
	/** 기본옵션 */
	this.defaultOption = {
		searchKeyword : ".input-text", //
		autocompleteLayer : ".autocomplete_layer",
		autocompleteClose : ".autocomplete_close",
		searchBtnArrow : ".btn_arrow",
	};
	this.$container = $(container);
	this.options = options ? $.extend(this.defaultOption, options) : this.defaultOption;

	this.init();
};
autoComplete.prototype = {
	init: function(){
		this.$searchKeyword = this.$container.find(this.options.searchKeyword);
		this.$autocompleteLayer = this.$container.find(this.options.autocompleteLayer);
		this.$autocompleteClose = this.$container.find(this.options.autocompleteClose);
		this.$searchBtnArrow = this.$container.find(this.options.searchBtnArrow);

		/** 이벤트 바인드 */
		this.$searchKeyword.on("keyup", $.proxy(this.autoKeyup, this));
		this.$searchKeyword.on("keydown", $.proxy(this.autoKeydown, this));
		this.$autocompleteClose.on("click", $.proxy(this.collapsed, this));
		this.$searchBtnArrow.on("click", $.proxy(this.toogleBtnFold, this));
	},
	// 글자 입력시
	autoKeyup: function(e) {
		var is_collapsed = this.$autocompleteLayer.hasClass('is_collapsed');
		if(!is_collapsed){
			var $searchKeywordValue = this.$searchKeyword.val();

			if($.trim($searchKeywordValue).length) this.$autocompleteLayer.addClass('is_expanded');
			else this.$autocompleteLayer.removeClass('is_expanded');

			var isexpanded = this.$autocompleteLayer.hasClass('is_expanded');
			if(isexpanded){
				this.$searchBtnArrow.addClass('is_fold');
			}else{
				this.$searchBtnArrow.removeClass('is_fold');
			}
		}
	},
	// 글자 입력 직전
	autoKeydown: function(e){
		if(event.which == 13) event.preventDefault();
	},
	// 자동완성 레이어 자동완성끄기 클릭했을 경우
	collapsed: function(e){
		this.$autocompleteLayer.removeClass('is_expanded');
		this.$autocompleteLayer.addClass('is_collapsed');
		this.$searchBtnArrow.removeClass('is_fold');
	},
	// 자동완성 화살표 버튼 토글
	toogleBtnFold: function(e){
		var $isFold = this.$autocompleteLayer.hasClass('is_expanded');
		var $arrowFlod = this.$searchBtnArrow.find('.arrow_fold');
		if(!$isFold){
			$arrowFlod.text('자동 완성 접기');
			this.$autocompleteLayer.addClass('is_expanded');
			this.$autocompleteLayer.removeClass('is_collapsed');
			this.$searchBtnArrow.addClass('is_fold');
		}else{
			$arrowFlod.text('자동 완성 열기');
			this.$autocompleteLayer.removeClass('is_expanded');
			this.$searchBtnArrow.removeClass('is_fold');
		}
	}
};
/*************************************************************************************
  let go!!!
**************************************************************************************/
$(document).ready(function() {

	commons.init();
	stickyHeader.init();
	noticeBanner.init();
	gnb.init();
	allMenu.init();
	search.init();
	//menuLnb.init();
	var currentmenu = $('.is_lnb1--opened');
	currentmenu.addClass('is_current_page');
	currentmenu.find('.is_lnb2--opened').attr("aria-label","현재 페이지");


	// 메인
	var autoComplete1 = new autoComplete(".main_section .search-form-wrap");
	// 헤더 공통
	var autoComplete2 = new autoComplete(".header .search-form-wrap");
	//검색 결과
	var autoComplete3 = new autoComplete(".integSearch_wrap .search-form-wrap");

	var categoryTabs1 = new categoryTabs(".category_wrap", { initialIndex: 0 });

	var categoryTabsLayer1 = new categoryTabs(".datalayer1_wrap", { initialIndex: 0 });
	var categoryTabsLayer3 = new categoryTabs(".datalayer3_wrap", { initialIndex: 0 });
	var categoryTabsLayer4 = new categoryTabs(".datalayer4_wrap", { initialIndex: 0 });
	var categoryTabsLayer5 = new categoryTabs(".datalayer5_wrap", { initialIndex: 0 });
	var categoryTabsLayer5 = new categoryTabs(".datalayer7_wrap", { initialIndex: 0 });

	var boardTabWrap = new Tabs(".board_tab_wrap", { initialIndex: 0 });
	var shortcutWrap = new Tabs(".shortcut_wrap", { initialIndex: 0 });
	var applyTabWrap = new Tabs(".apply_tab_wrap", { initialIndex: 0 });
	var categoryInfoWrap = new Tabs(".category_info_wrap", { initialIndex: 0 });
	var typeServiceWrap = new Tabs(".type_service_wrap", {
    initialIndex: 0,
    tabListClassName: ".type_list",
    tabItemClassName: ".type_item",
    tabPanelWrapClassName: ".type_tabpanel_wrap",
    tabPanelClassName: ".type_tabpanel",
	});

	//PC 모바일
	var vrKeyboard1 = new VRKeyboard(
		'.header__inner-top .input-text-wrap input',
		'.header__inner-top .btn-worldword',
		'.header__inner-top .keyboard-wrapper',
		{ position: { top: '100%', right: 0, marginTop: '10px' } }
	);

	//PC 콘텐츠 영역
	var vrKeyboard2 = new VRKeyboard(
		'.main_wide .input-text-wrap input',
		'.main_wide .btn-worldword',
		'.main_wide .btn-worldword-wrap',
		{
      position: { top: '100%', right: 0 },
      // 키보드가 닫힐 때 특정요소에 포커스를 이동시켜야할때
      // focusTargetWhenClosed: '.main_search .btn-search',
    }
	);

	//PC 서브 헤더 영역
	var vrKeyboard3 = new VRKeyboard(
		'.wide-search-wrap .input-text-wrap input',
		'.wide-search-wrap .btn-worldword',
		'.wide-search-wrap .keyboard-wrapper',
		{ position: { top: '100%', right: 0 } }
	);
	//MO 서브 헤더 영역
	var vrKeyboard4 = new VRKeyboard(
		'.search__utils-wrap .input-text-wrap input',
		'.search__utils-wrap .btn-worldword',
		'.search__utils-wrap .btn-worldword-wrap',
		{ position: { top: 'auto', right: '-50%' } }
	);

	//소장자료
	var vrKeyboard5 = new VRKeyboard(
		'.collect_search_wrap .input_text_wrap input',
		'.collect_search_wrap .btn-worldword',
		'.collect_search_wrap .btn-worldword-wrap',
		{ position: { top: 'auto', right: -30 } }
	);

	//구한국관보
	var vrKeyboard6 = new VRKeyboard(
		'.old_search_wrap .input_text_wrap input',
		'.old_search_wrap .btn-worldword',
		'.old_search_wrap .btn-worldword-wrap',
		{ position: { top: 'auto', right: -30 } }
  );

  //신문 키워드 검색
	var keywordSearchWrap = new VRKeyboard(
		'.keyword_search_wrap .input_text_wrap input',
		'.keyword_search_wrap .btn-worldword',
		'.keyword_search_wrap .btn-worldword-wrap',
		{ position: { top: 'auto', right: -30 } }
	);


  //통합검색
  /*
	var vrKeyboardNlSearch = new VRKeyboard(
		'.search-form_group .input-text-wrap input',
		'.search-form_group .btn-worldword',
		'.search-form_group .btn-worldword-wrap',
		{ position: { top: 'auto', right: -30 } }
	);*/


});

$(function(){

  $(window).scroll(function(){  //스크롤하면 아래 코드 실행
    if ($(window).width() > 767){
        var num = $(this).scrollTop();  // 스크롤값
        if( num > $(".header__inner-top").outerHeight()+$(".header__inner-bottom").outerHeight()){  // 스크롤을 36이상 했을 때
          $(".sub .wide-search-wrap").addClass("fixed_list");
          $(".sub").addClass("sub_fixed2");
          $(".sub .menu-tool-wrap").css({"display":"block"});
          $(".btn-open-pc").click(function(){
			  if($(".menu-tool-gray .btn-open-pc").hasClass('on')) $(".gray-gnb-wrap").addClass('on');
			  else $(".gray-gnb-wrap").removeClass('on');
          });

        }else{
          $(".sub .wide-search-wrap").removeClass("fixed_list");
          $(".sub").removeClass("sub_fixed2");
       	  $(".gray-gnb-wrap").removeClass('on');
		  $(".menu-tool-gray .btn-open-pc").removeClass('on');
          $(".sub .menu-tool-wrap").css({"display":"none"});
          $(".sub .gray-gnb-wrap").css({"display":"none"});
        }
    };

   // if($(window).width() > 767) {
   // 	$(window).on('resize', function(){location.reload();});
   // }
  });
});

$(function(){
  $(window).scroll(function(){  //스크롤하면 아래 코드 실행
    if ($(window).width() > 767){
        var num = $(this).scrollTop();  // 스크롤값
        if( num > 319 ){  // 스크롤을 36이상 했을 때
          $(".main .wide-search-wrap").addClass("fixed_list");
          //$(".main .menu-tool-wrap").css({"display":"block"});
          //$(".main .menu-tool-wrap").css({"display":"none"});
        }else{
          $(".main .wide-search-wrap").removeClass("fixed_list");
          //$(".main .menu-tool-wrap").css({"display":"none"});
        }
    }
    /*if($(document).scrollTop()>0) {
      $(".banner__content").attr("style", "display:none");
    } else {
      $(".banner__content").attr("style", "display:block");
    }*/
  });
});

$(function(){
	$('.btn-open-pc').click(function(){
	});
/*	$(".menu-tool-gray .btn-open-pc").click(function(){
		$(this).toggleClass("on");
	});*/
	$('.btn-open-pc').click(function(){
		$(".gray-gnb-wrap").toggle();
	});
	$(".menu-tool-gray .btn-open-pc").click(function(){
		$(this).toggleClass("on");
	});
	$(".gray-gnb-depth1__item").hover(function(){
		$(this).toggleClass("on");
	});
	$(".gray-gnb-depth2__item").hover(function(){
		$(this).toggleClass("on");
  });

	$(".btn-search--open2").click(function(){
		$(".search-all-wrap").addClass("on");
	});

	$(".btn-search--close").click(function(){
		$(".search-all-wrap").removeClass("on");
	});
});
